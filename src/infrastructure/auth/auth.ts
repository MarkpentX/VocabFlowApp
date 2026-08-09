import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { accounts, sessions, usersTable, verificationTokens } from "@/infrastructure/db/schema";
import { db } from "@/infrastructure/db/client";
import { drizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { hashPassword, verifyPassword } from "@/infrastructure/auth/password-hasher";

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
})
