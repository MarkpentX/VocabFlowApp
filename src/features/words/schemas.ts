import z from "zod";

export const TagSchema = z.object({
    tag:  z.string().max(255).min(2)
});

export const CreateWordSchema = z.object({
    infinitive: z.string().max(255).min(2),
    meaning: z.string().max(255).min(2),
}).extend({
    tag: z.string().max(255).min(2),
});

export const AnswerSchema = z.object({
    answer: z.string().max(255).min(2),
})

