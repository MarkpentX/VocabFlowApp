import { GrammarRepository } from "@/domain/repositories/grammar-repository";
import { GrammarRuleMeta, GrammarStats, computeGrammarStats } from "@/domain/entities/grammar";
import { errors } from "@/domain/errors/factory";

export function createGetGrammarStatsUseCase(grammarRepository: GrammarRepository, rules: GrammarRuleMeta[]) {
    return async function getGrammarStats(userId: string): Promise<GrammarStats> {
        try {
            const progress = await grammarRepository.getProgress(userId);
            return computeGrammarStats(
                rules.map((rule) => rule.key),
                progress
            );
        } catch {
            throw errors.db();
        }
    };
}
