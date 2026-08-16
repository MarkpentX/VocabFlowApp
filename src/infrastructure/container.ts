import { drizzleWordRepository } from "@/infrastructure/repositories/drizzle-word-repository";
import { drizzleDictionaryRepository } from "@/infrastructure/repositories/drizzle-dictionary-repository";
import { drizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { drizzleShopRepository } from "@/infrastructure/repositories/drizzle-shop-repository";
import { LEVEL_TEST_QUESTIONS } from "@/infrastructure/data/level-test-questions";
import { LEVEL_TEST_READING_QUESTIONS } from "@/infrastructure/data/level-test-reading";
import { LEVEL_TEST_LISTENING_QUESTIONS } from "@/infrastructure/data/level-test-listening";
import { LEVEL_TEST_WRITING_PROMPT } from "@/infrastructure/data/level-test-writing-prompts";
import { mymemoryTranslationService } from "@/infrastructure/services/mymemory-translation-service";
import { googleTranslationService } from "@/infrastructure/services/google-translation-service";
import { createCompositeTranslationService } from "@/infrastructure/services/composite-translation-service";
import { nextAuthService } from "@/infrastructure/auth/next-auth-service";
import { drizzleGrammarRepository } from "@/infrastructure/repositories/drizzle-grammar-repository";
import { drizzleGrammarSharedResultRepository } from "@/infrastructure/repositories/drizzle-grammar-shared-result-repository";
import { drizzlePracticeSessionRepository } from "@/infrastructure/repositories/drizzle-practice-session-repository";
import { GRAMMAR_RULES } from "@/infrastructure/data/grammar-rules";

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
import { createGetCoinsUseCase } from "@/application/use-cases/users/get-coins";
import { createAwardPracticeCoinsUseCase } from "@/application/use-cases/users/award-practice-coins";
import { createGetShopStatusUseCase } from "@/application/use-cases/shop/get-shop-status";
import { createPurchaseItemUseCase } from "@/application/use-cases/shop/purchase-item";
import { createGetExamWordsUseCase } from "@/application/use-cases/words/get-exam-words";
import { createGetLevelTestQuestionsUseCase } from "@/application/use-cases/level-test/get-level-test-questions";
import { createScoreLevelTestWritingUseCase } from "@/application/use-cases/level-test/score-level-test-writing";
import { createGetGrammarRulesUseCase } from "@/application/use-cases/grammar/get-grammar-rules";
import { createGetGrammarStatsUseCase } from "@/application/use-cases/grammar/get-grammar-stats";
import { createGenerateGrammarSessionUseCase } from "@/application/use-cases/grammar/generate-grammar-session";
import { createGenerateGrammarDiagnosticUseCase } from "@/application/use-cases/grammar/generate-grammar-diagnostic";
import { createRecordGrammarAttemptUseCase } from "@/application/use-cases/grammar/record-grammar-attempt";
import { createCreateSharedGrammarResultUseCase } from "@/application/use-cases/grammar/create-shared-grammar-result";
import { createGetSharedGrammarResultUseCase } from "@/application/use-cases/grammar/get-shared-grammar-result";
import { createStartPracticeSessionUseCase } from "@/application/use-cases/practice/start-practice-session";
import { createCompletePracticeSessionUseCase } from "@/application/use-cases/practice/complete-practice-session";

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

export const getCoins = createGetCoinsUseCase(drizzleUserRepository);
export const awardPracticeCoins = createAwardPracticeCoinsUseCase(drizzleUserRepository);

export const startPracticeSession = createStartPracticeSessionUseCase(drizzlePracticeSessionRepository);
export const completePracticeSession = createCompletePracticeSessionUseCase(drizzlePracticeSessionRepository, awardPracticeCoins);

export const getUserStats = createGetUserStatsUseCase({ getUserDictionaries, getUserWords, getStreak, getCoins });

export const getUsers = createGetUsersUseCase(drizzleUserRepository);

export const getShopStatus = createGetShopStatusUseCase({
    userRepository: drizzleUserRepository,
    shopRepository: drizzleShopRepository,
});
export const purchaseItem = createPurchaseItemUseCase(drizzleShopRepository);

export const getExamWords = createGetExamWordsUseCase(drizzleWordRepository);

const ALL_LEVEL_TEST_QUESTIONS = [
    ...LEVEL_TEST_QUESTIONS.map((question) => ({ ...question, section: "useOfEnglish" as const })),
    ...LEVEL_TEST_READING_QUESTIONS,
    ...LEVEL_TEST_LISTENING_QUESTIONS,
];

export const getLevelTestQuestions = createGetLevelTestQuestionsUseCase(ALL_LEVEL_TEST_QUESTIONS);
export const getLevelTestWritingPrompt = async () => LEVEL_TEST_WRITING_PROMPT;
export const scoreLevelTestWriting = createScoreLevelTestWritingUseCase();

export const registerUser = createRegisterUserUseCase({
    authService: nextAuthService,
});

export const getGrammarRules = createGetGrammarRulesUseCase(GRAMMAR_RULES);
export const getGrammarStats = createGetGrammarStatsUseCase(drizzleGrammarRepository, GRAMMAR_RULES);
export const generateGrammarSession = createGenerateGrammarSessionUseCase(GRAMMAR_RULES);
export const generateGrammarDiagnostic = createGenerateGrammarDiagnosticUseCase(GRAMMAR_RULES);
export const recordGrammarAttempt = createRecordGrammarAttemptUseCase(drizzleGrammarRepository);
export const createSharedGrammarResult = createCreateSharedGrammarResultUseCase(
    drizzleGrammarSharedResultRepository,
    drizzlePracticeSessionRepository
);
export const getSharedGrammarResult = createGetSharedGrammarResultUseCase(drizzleGrammarSharedResultRepository);

const translationService = createCompositeTranslationService([
    googleTranslationService,
    mymemoryTranslationService,
]);

export const translateWord = createTranslateWordUseCase(translationService);
