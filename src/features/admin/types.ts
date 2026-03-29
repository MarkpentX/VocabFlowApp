import {usersTable} from "@/db/schema";

export type DbUser = typeof usersTable.$inferSelect;
