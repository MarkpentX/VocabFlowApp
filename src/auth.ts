import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {accounts, sessions, usersTable, verificationTokens} from "@/db/schema";
import {db} from "@/index";
import {DrizzleAdapter} from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        Google
    ],
})