import { NewWordInput, Word } from "@/domain/entities/word";

export interface WordRepository {
    create(tagId: string, word: NewWordInput): Promise<void>;
    findByTagIds(tagIds: string[]): Promise<Word[]>;
    findByUserAndTagName(userId: string, tagName: string): Promise<Word[]>;
    delete(id: string): Promise<void>;
}
