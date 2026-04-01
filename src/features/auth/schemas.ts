import z from "zod";

export const CreateUserSchema = z.object({
    username: z.string().max(24),
    password: z.string().min(8),
})