import { AuthService } from "@/domain/services/auth-service";
import { CaptchaService } from "@/domain/services/captcha-service";
import { CreateUserSchema } from "@/domain/validation/user.schema";
import { validate } from "@/application/shared/validate";
import { trimObject } from "@/application/shared/trim-object";
import { NewUserInput } from "@/domain/entities/user";
import { errors } from "@/domain/errors/factory";

export interface RegisterUserDeps {
    authService: AuthService;
    captchaService: CaptchaService;
}

export function createRegisterUserUseCase({ authService, captchaService }: RegisterUserDeps) {
    return async function registerUser(input: NewUserInput): Promise<void> {
        const trimmed = trimObject(input);
        validate(CreateUserSchema, trimmed);

        const captchaOk = await captchaService.verify(trimmed.captchaToken);
        if (!captchaOk) {
            throw errors.auth("captcha_failed");
        }

        const result = await authService.signInWithCredentials(trimmed.username, trimmed.password);
        if (!result.ok) {
            throw errors.auth(result.error ?? "Authentication failed");
        }
    };
}
