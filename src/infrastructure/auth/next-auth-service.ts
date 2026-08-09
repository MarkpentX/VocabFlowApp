import { signIn } from "@/infrastructure/auth/auth";
import { AuthService, CredentialsSignInResult } from "@/domain/services/auth-service";

export const nextAuthService: AuthService = {
    async signInWithCredentials(username: string, password: string): Promise<CredentialsSignInResult> {
        try {
            await signIn("credentials", { username, password, redirect: false });
            return { ok: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : "";
            const isIncorrectPassword = message.includes("Incorrect password") || message.includes("CredentialsSignin");
            return {
                ok: false,
                error: isIncorrectPassword ? "incorrect_password" : "auth_failed",
            };
        }
    },
};
