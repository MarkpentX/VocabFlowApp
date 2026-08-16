import { AuthService } from "@/domain/services/auth-service";
import { CreateUserSchema } from "@/domain/validation/user.schema";
import { validate } from "@/application/shared/validate";
import { trimObject } from "@/application/shared/trim-object";
import { NewUserInput } from "@/domain/entities/user";
import { errors } from "@/domain/errors/factory";

export interface RegisterUserDeps {
    authService: AuthService;
}

export function createRegisterUserUseCase({ authService }: RegisterUserDeps) {
    return async function registerUser(input: NewUserInput): Promise<void> {
        const trimmed = trimObject(input);
        validate(CreateUserSchema, trimmed);

        if (!trimmed.captchaToken) {
            throw errors.auth("captcha_failed");
        }

        // The real captcha verification happens inside NextAuth's authorize()
        // callback (see auth.ts) — that's the one true entry point for credentials
        // sign-in regardless of caller, whereas this use-case can be bypassed by
        // hitting /api/auth/callback/credentials directly. Verifying the (single-use)
        // token here too would just consume it before authorize() ever sees it.
        const result = await authService.signInWithCredentials(trimmed.username, trimmed.password, trimmed.captchaToken);
        if (!result.ok) {
            throw errors.auth(result.error ?? "Authentication failed");
        }
    };
}
