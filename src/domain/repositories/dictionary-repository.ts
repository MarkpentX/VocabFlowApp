import { Dictionary, DictionaryWithWordsCount } from "@/domain/entities/dictionary";

export interface DictionaryRepository {
    create(userId: string, name: string): Promise<Dictionary>;
    findByUserAndName(userId: string, name: string): Promise<Dictionary | null>;
    findAllByUser(userId: string): Promise<Dictionary[]>;
    findAllWithWordsCount(userId: string): Promise<DictionaryWithWordsCount[]>;
    delete(id: string): Promise<void>;
}
