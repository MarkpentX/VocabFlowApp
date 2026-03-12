import z from "zod";
import {CreateWordSchema} from "@/features/words/schemas";
import {words} from "@/db/wordsTable";

export type CreateWord = z.infer<typeof CreateWordSchema>;

export type DbWord = typeof words.$inferSelect;

