import { NewWordInput, Word } from "@/domain/entities/word";

export interface WordRepository {
    create(dictionaryId: string, word: NewWordInput): Promise<void>;
    findByDictionaryIds(dictionaryIds: string[]): Promise<Word[]>;
    findByUserAndDictionaryName(userId: string, dictionaryName: string): Promise<Word[]>;
    findByUserAndDictionaryIds(userId: string, dictionaryIds: string[]): Promise<Word[]>;
    delete(id: string, userId: string): Promise<void>;
}
