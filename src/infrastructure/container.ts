import { drizzleWordRepository } from "@/infrastructure/repositories/drizzle-word-repository";
import { drizzleDictionaryRepository } from "@/infrastructure/repositories/drizzle-dictionary-repository";
import { drizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { mymemoryTranslationService } from "@/infrastructure/services/mymemory-translation-service";
import { googleTranslationService } from "@/infrastructure/services/google-translation-service";
import { createCompositeTranslationService } from "@/infrastructure/services/composite-translation-service";
import { nextAuthService } from "@/infrastructure/auth/next-auth-service";

import { createCreateWordUseCase } from "@/application/use-cases/words/create-word";
import { createDeleteWordUseCase } from "@/application/use-cases/words/delete-word";
import { createGetWordsByDictionaryUseCase } from "@/application/use-cases/words/get-words-by-dictionary";
import { createGetUserWordsUseCase } from "@/application/use-cases/words/get-user-words";
import { createGetDictionariesUseCase } from "@/application/use-cases/dictionaries/get-dictionaries-with-word-counts";
import { createGetUserDictionariesUseCase } from "@/application/use-cases/dictionaries/get-user-dictionaries";
import { createDeleteDictionaryUseCase } from "@/application/use-cases/dictionaries/delete-dictionary";
import { createGetUserStatsUseCase } from "@/application/use-cases/users/get-user-stats";
import { createGetStreakUseCase } from "@/application/use-cases/users/get-streak";
import { createRecordPracticeCompletionUseCase } from "@/application/use-cases/users/record-practice-completion";
import { createGetUsersUseCase } from "@/application/use-cases/admin/get-users";
import { createRegisterUserUseCase } from "@/application/use-cases/auth/register-user";
import { createTranslateWordUseCase } from "@/application/use-cases/translation/translate-word";

export const createWord = createCreateWordUseCase({
    wordRepository: drizzleWordRepository,
    dictionaryRepository: drizzleDictionaryRepository,
});

export const deleteWord = createDeleteWordUseCase(drizzleWordRepository);
export const getWordsByDictionary = createGetWordsByDictionaryUseCase(drizzleWordRepository);
export const getUserWords = createGetUserWordsUseCase(drizzleWordRepository);

export const getDictionaries = createGetDictionariesUseCase(drizzleDictionaryRepository);
export const getUserDictionaries = createGetUserDictionariesUseCase(drizzleDictionaryRepository);
export const deleteDictionary = createDeleteDictionaryUseCase(drizzleDictionaryRepository);

export const getStreak = createGetStreakUseCase(drizzleUserRepository);
export const recordPracticeCompletion = createRecordPracticeCompletionUseCase(drizzleUserRepository);

export const getUserStats = createGetUserStatsUseCase({ getUserDictionaries, getUserWords, getStreak });

export const getUsers = createGetUsersUseCase(drizzleUserRepository);

export const registerUser = createRegisterUserUseCase(nextAuthService);

const translationService = createCompositeTranslationService([
    googleTranslationService,
    mymemoryTranslationService,
]);

export const translateWord = createTranslateWordUseCase(translationService);
