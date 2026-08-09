import { AuthService } from "@/domain/services/auth-service";
import { CreateUserSchema } from "@/domain/validation/user.schema";
import { validate } from "@/application/shared/validate";
import { trimObject } from "@/application/shared/trim-object";
import { NewUserInput } from "@/domain/entities/user";
import { errors } from "@/domain/errors/factory";

export function createRegisterUserUseCase(authService: AuthService) {
    return async function registerUser(input: NewUserInput): Promise<void> {
        const trimmed = trimObject(input);
        validate(CreateUserSchema, trimmed);

        const result = await authService.signInWithCredentials(trimmed.username, trimmed.password);
        if (!result.ok) {
            throw errors.auth(result.error ?? "Authentication failed");
        }
    };
}
