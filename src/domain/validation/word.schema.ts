import z from "zod";
import { WORD_LANGUAGES } from "@/domain/entities/word";

export const TagNameSchema = z.object({
    tag: z.string().max(255).min(2),
});

export const CreateWordSchema = z.object({
    infinitive: z.string().max(255).min(2),
    meaning: z.string().max(255).min(2),
    meaningLang: z.enum(WORD_LANGUAGES),
    tag: z.string().max(255).min(2),
});

export const AnswerSchema = z.object({
    answer: z.string().max(255).min(2),
});
