import { signIn } from "@/infrastructure/auth/auth";
import { AuthService, CredentialsSignInResult } from "@/domain/services/auth-service";

export const nextAuthService: AuthService = {
    async signInWithCredentials(username: string, password: string): Promise<CredentialsSignInResult> {
        try {
            await signIn("credentials", { username, password, redirect: false });
            return { ok: true };
        } catch (err) {
            // Auth.js wraps whatever `authorize()` throws into a `CallbackRouteError`
            // and discards its message on the outer error — the original error (and its
            // message, e.g. "Incorrect password") only survives on `err.cause.err`.
            const cause = err instanceof Error ? (err.cause as { err?: Error } | undefined) : undefined;
            const originalMessage = cause?.err?.message ?? (err instanceof Error ? err.message : "");
            const isIncorrectPassword = originalMessage.includes("Incorrect password");

            return {
                ok: false,
                error: isIncorrectPassword ? "incorrect_password" : "auth_failed",
            };
        }
    },
};
