import { LevelTestQuestion, LevelTestSection } from "@/domain/entities/level-test";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Writing isn't included here — it's a single free-text prompt handled by its own
// use-case/action, not part of this shuffled multiple-choice question stream.
const SECTION_ORDER: LevelTestSection[] = ["useOfEnglish", "reading", "listening"];

export function createGetLevelTestQuestionsUseCase(questions: LevelTestQuestion[]) {
    return async function getLevelTestQuestions(): Promise<LevelTestQuestion[]> {
        return SECTION_ORDER.flatMap((section) => {
            const sectionQuestions = questions.filter((question) => question.section === section);
            return shuffle(sectionQuestions).map((question) => ({ ...question, answers: shuffle(question.answers) }));
        });
    };
}
