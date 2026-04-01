import {CreateUserSchema} from "@/features/auth/schemas";
import z from "zod";
import {usersTable} from "@/db/usersTable";

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type DbUser = typeof usersTable.$inferSelect;

import "next-auth"
import "next-auth/jwt"
