import { QuizQuestion } from "@/domain/entities/quiz";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export const LEVEL_TEST_SECTIONS = ["useOfEnglish", "reading", "listening", "writing"] as const;

export type LevelTestSection = (typeof LEVEL_TEST_SECTIONS)[number];

export interface LevelTestQuestion extends QuizQuestion {
    section: LevelTestSection;
    // Kept for reference/content-authoring only — the scoring model no longer walks
    // per-question CEFR levels, it bands each *section* by raw accuracy (see below).
    level?: CEFRLevel;
    passage?: string;
    audioText?: string;
}

export interface LevelTestAnswer {
    section: LevelTestSection;
    isCorrect: boolean;
}

export interface WritingPrompt {
    id: string;
    prompt: string;
    minWords: number;
}

export interface WritingScore {
    taskResponse: number;
    coherence: number;
    lexicalResource: number;
    accuracy: number;
    overall: number;
    wordCount: number;
}

export interface SectionBand {
    section: LevelTestSection;
    correct: number;
    total: number;
    accuracy: number;
    band: number;
}

export interface IeltsLevelTestResult {
    sections: SectionBand[];
    writing: WritingScore | null;
    overallBand: number;
    cefrLevel: CEFRLevel;
}

function clamp(min: number, max: number, value: number): number {
    return Math.min(max, Math.max(min, value));
}

function roundToHalf(value: number): number {
    return Math.round(value * 2) / 2;
}

// Real IELTS raw-score→band conversion tables are non-linear and vary slightly between
// test sittings, and there's no single public formula — this is a straightforward linear
// approximation (accuracy% scaled onto the 0–9 band scale, rounded to the nearest 0.5,
// which IELTS itself uses) rather than an attempt to reverse-engineer the exact real tables.
function accuracyToBand(accuracyPercent: number): number {
    return roundToHalf(clamp(0, 9, (accuracyPercent / 100) * 9));
}

// Published Cambridge/IELTS↔CEFR alignment (approximate, widely used for this exact purpose).
function bandToCefr(band: number): CEFRLevel {
    if (band >= 8.5) return "C2";
    if (band >= 7) return "C1";
    if (band >= 5.5) return "B2";
    if (band >= 4) return "B1";
    if (band >= 3) return "A2";
    return "A1";
}

export function computeIeltsResult(answers: LevelTestAnswer[], writing: WritingScore | null): IeltsLevelTestResult {
    const scoredSections: LevelTestSection[] = ["useOfEnglish", "reading", "listening"];

    const sections: SectionBand[] = scoredSections
        .map((section) => {
            const sectionAnswers = answers.filter((a) => a.section === section);
            const correct = sectionAnswers.filter((a) => a.isCorrect).length;
            const total = sectionAnswers.length;
            const accuracy = total === 0 ? 0 : (correct / total) * 100;
            return { section, correct, total, accuracy, band: total === 0 ? 0 : accuracyToBand(accuracy) };
        })
        .filter((entry) => entry.total > 0);

    const bands = sections.map((entry) => entry.band);
    if (writing) {
        bands.push(writing.overall);
    }

    const overallBand = bands.length === 0 ? 0 : roundToHalf(bands.reduce((sum, b) => sum + b, 0) / bands.length);

    return {
        sections,
        writing,
        overallBand,
        cefrLevel: bandToCefr(overallBand),
    };
}

const COHESIVE_DEVICES = [
    "however",
    "moreover",
    "furthermore",
    "in addition",
    "on the other hand",
    "firstly",
    "secondly",
    "finally",
    "in conclusion",
    "therefore",
    "for example",
    "for instance",
    "in contrast",
    "as a result",
    "overall",
    "in summary",
    "additionally",
    "consequently",
    "nevertheless",
    "thus",
];

const STOPWORDS = new Set([
    "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "to", "of", "in", "on",
    "for", "with", "that", "this", "it", "as", "at", "by", "be", "have", "has", "had", "i",
    "you", "he", "she", "we", "they", "not", "so", "if", "my", "your", "will", "would", "can",
]);

function scoreTaskResponse(wordCount: number, minWords: number): number {
    if (wordCount === 0) {
        return 0;
    }
    if (wordCount < minWords) {
        return roundToHalf(clamp(0, 9, (wordCount / minWords) * 6));
    }
    const bonus = Math.min(1, (wordCount - minWords) / minWords);
    return roundToHalf(clamp(0, 9, 6.5 + bonus * 2.5));
}

function scoreCoherence(text: string): number {
    const paragraphs = text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0).length;
    const lower = text.toLowerCase();
    const devicesUsed = COHESIVE_DEVICES.filter((device) => lower.includes(device)).length;

    const paragraphScore = paragraphs >= 3 ? 4 : paragraphs === 2 ? 2.5 : paragraphs === 1 ? 1 : 0;
    const devicesScore = Math.min(5, devicesUsed * 1.2);

    return roundToHalf(clamp(0, 9, paragraphScore + devicesScore));
}

function scoreLexicalResource(words: string[]): number {
    const cleaned = words.map((w) => w.toLowerCase().replace(/[^a-z']/g, "")).filter((w) => w.length > 0);
    if (cleaned.length === 0) {
        return 0;
    }

    const unique = new Set(cleaned);
    const ttr = unique.size / cleaned.length;

    const freq = new Map<string, number>();
    for (const word of cleaned) {
        if (STOPWORDS.has(word)) {
            continue;
        }
        freq.set(word, (freq.get(word) ?? 0) + 1);
    }
    const maxFreq = freq.size === 0 ? 0 : Math.max(...freq.values());
    const overusePenalty = maxFreq / cleaned.length > 0.08 ? 1.5 : 0;

    return roundToHalf(clamp(0, 9, ttr * 16 - overusePenalty));
}

function scoreAccuracyProxy(text: string): number {
    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    if (sentences.length === 0) {
        return 0;
    }

    let goodSentences = 0;
    for (const sentence of sentences) {
        const startsCapital = /^[A-Z]/.test(sentence);
        const endsProperly = /[.!?]$/.test(sentence);
        const noDoubleSpace = !/ {2}/.test(sentence);
        const wordCount = sentence.split(/\s+/).filter(Boolean).length;
        const plausibleLength = wordCount >= 3 && wordCount <= 40;
        if (startsCapital && endsProperly && noDoubleSpace && plausibleLength) {
            goodSentences++;
        }
    }

    return roundToHalf(clamp(0, 9, (goodSentences / sentences.length) * 9));
}

/**
 * A deterministic, rule-based approximation — NOT real grammar/content grading, which would
 * require NLP/LLM infrastructure this app doesn't have. It measures structural and lexical
 * proxies (length vs. target, paragraphing, cohesive devices, vocabulary variety, basic
 * sentence mechanics) and is presented to the user as an estimate, not a verdict.
 */
export function scoreWritingResponse(text: string, minWords: number): WritingScore {
    const words = text.trim().length === 0 ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;

    const taskResponse = scoreTaskResponse(wordCount, minWords);
    const coherence = scoreCoherence(text);
    const lexicalResource = scoreLexicalResource(words);
    const accuracy = scoreAccuracyProxy(text);

    const overall = roundToHalf((taskResponse + coherence + lexicalResource + accuracy) / 4);

    return { taskResponse, coherence, lexicalResource, accuracy, overall, wordCount };
}
