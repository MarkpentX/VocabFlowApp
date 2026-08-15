import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { accounts, sessions, usersTable, verificationTokens } from "@/infrastructure/db/schema";
import { db } from "@/infrastructure/db/client";
import { drizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { hashPassword, verifyPassword } from "@/infrastructure/auth/password-hasher";
import { getPostHogServerClient } from "@/infrastructure/analytics/posthog-server";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),

    providers: [
        Google,

        Credentials({
            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing credentials")
                }

                let user = await drizzleUserRepository.findByUsername(credentials.username as string)

                if (!user) {
                    const passwordHash = await hashPassword(credentials.password as string)
                    user = await drizzleUserRepository.createWithPassword(credentials.username as string, passwordHash)
                }

                const passwordCorrect = await verifyPassword(
                    credentials.password as string,
                    user.passwordHash!
                )

                if (!passwordCorrect) {
                    throw new Error("Incorrect password")
                }

                return {
                    id: user.id,
                    username: user.username ?? undefined,
                    email: user.email ?? undefined,
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    // Without this, Auth.js rejects the OAuth callback with an "UntrustedHost" error whenever
    // the app is reached through a host it didn't expect (any deploy target other than Vercel,
    // a custom domain, a proxy, etc.) — this is the most common cause of "Google sign-in silently
    // fails" in self-hosted Auth.js v5 apps.
    trustHost: true,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
                token.email = user.email ?? undefined
            }

            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.username = token.username

                if (token.email) {
                    session.user.email = token.email
                }
            }

            return session
        },
    },

    events: {
        async signIn({ user, account, isNewUser }) {
            const posthogClient = getPostHogServerClient();
            if (!posthogClient || !user.id) {
                return
            }

            posthogClient.capture({
                distinctId: user.id,
                event: isNewUser ? "user_signed_up" : "user_signed_in",
                properties: {
                    email: user.email,
                    username: (user as { username?: string }).username,
                    provider: account?.provider,
                },
            })

            await posthogClient.flush()
        },
    },
})
