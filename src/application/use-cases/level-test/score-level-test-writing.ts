import { scoreWritingResponse, WritingScore } from "@/domain/entities/level-test";
import { errors } from "@/domain/errors/factory";

const MAX_RESPONSE_LENGTH = 10000;

export function createScoreLevelTestWritingUseCase() {
    return async function scoreLevelTestWriting(text: string, minWords: number): Promise<WritingScore> {
        if (typeof text !== "string" || text.length > MAX_RESPONSE_LENGTH) {
            throw errors.validation("Invalid writing response");
        }

        return scoreWritingResponse(text, minWords);
    };
}
