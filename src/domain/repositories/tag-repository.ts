import { Tag, TagWithWordsCount } from "@/domain/entities/tag";

export interface TagRepository {
    create(userId: string, name: string): Promise<Tag>;
    findByUserAndName(userId: string, name: string): Promise<Tag | null>;
    findAllByUser(userId: string): Promise<Tag[]>;
    findAllWithWordsCount(userId: string): Promise<TagWithWordsCount[]>;
    delete(id: string): Promise<void>;
}
