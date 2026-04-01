import NextAuth from "next-auth"
import Google from "@auth/core/providers/google"
import Credentials from "@auth/core/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { compare } from "bcryptjs"

import { accounts, sessions, usersTable, verificationTokens } from "@/db/schema"
import { db } from "@/index"
import { createUserDB, getUserByUsernameDB } from "@/features/auth/queries"

// === TypeScript module augmentation ===
declare module "next-auth" {
    interface User {
        username?: string
        email?: string | null
    }

    interface Session {
        user: {
            id: string
            username?: string
            email?: string   // <-- теперь string | undefined
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        username?: string
        email?: string
    }
}

// === NextAuth configuration ===
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
                let user = await getUserByUsernameDB(credentials.username as string)

                if (!user) {
                    const data = {
                        username: credentials.username as string,
                        password: credentials.password as string,
                    }
                    user = await createUserDB(data)
                } else {
                    const passwordCorrect = await compare(
                        credentials.password as string,
                        user.passwordHash!
                    )
                    if (!passwordCorrect) {
                        throw new Error("Incorrect credentials")
                    }
                }

                return {
                    id: user.id.toString(),
                    username: user.username ?? undefined,
                    email: user.email ?? undefined, // <-- null превращаем в undefined
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
                if (token.email) session.user.email = token.email // <-- только если есть
            }
            return session
        },
    },
})