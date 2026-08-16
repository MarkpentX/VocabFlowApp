import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { buildQuestion, generateBatch, pickOne } from "@/infrastructure/data/grammar-rules/helpers";

interface Subject {
    text: string;
    haveTo: "have to" | "has to";
}

const SUBJECTS: Subject[] = [
    { text: "I", haveTo: "have to" },
    { text: "You", haveTo: "have to" },
    { text: "We", haveTo: "have to" },
    { text: "They", haveTo: "have to" },
    { text: "He", haveTo: "has to" },
    { text: "She", haveTo: "has to" },
    { text: "My brother", haveTo: "has to" },
    { text: "The driver", haveTo: "has to" },
    { text: "Tom", haveTo: "has to" },
];

// Obligation/advice/necessity share one generic action pool (the sentence frame
// itself provides the cue). Ability needs its own pool — actions you either can
// or can't physically/mentally do — otherwise there is nothing in the sentence
// to signal "ability" once the category label is removed.
const OBLIGATION_ACTIONS = [
    "wear a seatbelt",
    "arrive on time",
    "pay taxes",
    "follow the rules",
    "show ID",
    "finish the report",
    "clean the room",
    "ask for help",
    "take a break",
    "tell the truth",
];

const ABILITY_ACTIONS = ["swim across the river", "speak three languages", "play the piano", "solve this puzzle", "run 10 kilometers", "drive a truck", "read music", "fix a computer", "cook a three-course meal", "lift this box"];

type ModalType = "ability" | "obligation" | "advice" | "necessity";

function modalFor(type: ModalType, subject: Subject): string {
    switch (type) {
        case "ability":
            return "can";
        case "obligation":
            return "must";
        case "advice":
            return "should";
        case "necessity":
            return subject.haveTo;
    }
}

// Each type keeps its own hand-verified contextual cue — no category label is
// shown anymore, so the cue in the sentence is the only thing that makes the
// intended modal the single defensible answer. "must" (internal obligation) and
// "have to" (external rule) are otherwise genuinely fuzzy in real usage without
// a strong cue.
// "I" is never lowercased, even mid-sentence — every other pronoun/noun subject is.
function midSentence(subject: string): string {
    return subject === "I" ? "I" : subject.toLowerCase();
}

const FRAMES: Record<ModalType, (subject: string, action: string) => string> = {
    ability: (subject, action) => `Thanks to years of practice, ${midSentence(subject)} ___ ${action} easily.`,
    advice: (subject, action) => `In my opinion, ${midSentence(subject)} probably ___ ${action}.`,
    obligation: (subject, action) => `${subject} really ___ ${action} right now — there's no other choice.`,
    necessity: (subject, action) => `${subject} ___ ${action}, according to the official rules.`,
};

const ALL_TYPES: ModalType[] = ["ability", "obligation", "advice", "necessity"];

export const modalVerbsRule: GrammarRuleMeta = {
    key: "modal-verbs",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const type = pickOne(ALL_TYPES);
            const action = type === "ability" ? pickOne(ABILITY_ACTIONS) : pickOne(OBLIGATION_ACTIONS);
            const correct = modalFor(type, subject);

            const otherTypes = ALL_TYPES.filter((t) => t !== type);
            const distractors = otherTypes.map((t) => modalFor(t, subject));

            const sentence = FRAMES[type](subject.text, action);
            const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);

            return buildQuestion(capitalized, correct, distractors);
        });
    },
};
