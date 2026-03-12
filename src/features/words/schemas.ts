import z from "zod";

export const CreateWordSchema = z.object({
    infinitive: z.string().max(255).min(2),
    meaning: z.string().max(255).min(2),
    tag: z.string().max(255).min(2).optional(),
})

export const AnswerSchema = z.object({
    answer: z.string().max(255).min(2),
})