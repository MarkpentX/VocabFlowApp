import { CreateSharedResultInput, SharedGrammarResult } from "@/domain/entities/grammar-shared-result";

export interface GrammarSharedResultRepository {
    create(userId: string, studentName: string, input: CreateSharedResultInput): Promise<SharedGrammarResult>;
    getById(id: string): Promise<SharedGrammarResult | null>;
}
