import { drizzleWordRepository } from "@/infrastructure/repositories/drizzle-word-repository";
import { drizzleTagRepository } from "@/infrastructure/repositories/drizzle-tag-repository";
import { drizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { mymemoryTranslationService } from "@/infrastructure/services/mymemory-translation-service";
import { googleTranslationService } from "@/infrastructure/services/google-translation-service";
import { createCompositeTranslationService } from "@/infrastructure/services/composite-translation-service";
import { nextAuthService } from "@/infrastructure/auth/next-auth-service";

import { createCreateWordUseCase } from "@/application/use-cases/words/create-word";
import { createDeleteWordUseCase } from "@/application/use-cases/words/delete-word";
import { createGetWordsByTagUseCase } from "@/application/use-cases/words/get-words-by-tag";
import { createGetUserWordsUseCase } from "@/application/use-cases/words/get-user-words";
import { createGetTagsUseCase } from "@/application/use-cases/tags/get-tags-with-word-counts";
import { createGetUserTagsUseCase } from "@/application/use-cases/tags/get-user-tags";
import { createDeleteTagUseCase } from "@/application/use-cases/tags/delete-tag";
import { createGetUserStatsUseCase } from "@/application/use-cases/users/get-user-stats";
import { createGetStreakUseCase } from "@/application/use-cases/users/get-streak";
import { createRecordPracticeCompletionUseCase } from "@/application/use-cases/users/record-practice-completion";
import { createGetUsersUseCase } from "@/application/use-cases/admin/get-users";
import { createRegisterUserUseCase } from "@/application/use-cases/auth/register-user";
import { createTranslateWordUseCase } from "@/application/use-cases/translation/translate-word";

export const createWord = createCreateWordUseCase({
    wordRepository: drizzleWordRepository,
    tagRepository: drizzleTagRepository,
});

export const deleteWord = createDeleteWordUseCase(drizzleWordRepository);
export const getWordsByTag = createGetWordsByTagUseCase(drizzleWordRepository);
export const getUserWords = createGetUserWordsUseCase(drizzleWordRepository);

export const getTags = createGetTagsUseCase(drizzleTagRepository);
export const getUserTags = createGetUserTagsUseCase(drizzleTagRepository);
export const deleteTag = createDeleteTagUseCase(drizzleTagRepository);

export const getStreak = createGetStreakUseCase(drizzleUserRepository);
export const recordPracticeCompletion = createRecordPracticeCompletionUseCase(drizzleUserRepository);

export const getUserStats = createGetUserStatsUseCase({ getUserTags, getUserWords, getStreak });

export const getUsers = createGetUsersUseCase(drizzleUserRepository);

export const registerUser = createRegisterUserUseCase(nextAuthService);

const translationService = createCompositeTranslationService([
    googleTranslationService,
    mymemoryTranslationService,
]);

export const translateWord = createTranslateWordUseCase(translationService);
