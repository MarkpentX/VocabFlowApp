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
    { text: "It", haveTo: "has to" },
    { text: "My brother", haveTo: "has to" },
    { text: "The driver", haveTo: "has to" },
    { text: "Tom", haveTo: "has to" },
];

const ACTIONS = [
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

// Each type gets its own sentence frame with a strong contextual cue, so the
// intended modal is the single defensible answer — "must" (personal/internal
// obligation) and "have to" (external rule) are otherwise genuinely fuzzy in
// real usage, and a bare template made both readings arguable.
const FRAMES: Record<ModalType, (subject: string, action: string) => string> = {
    ability: (subject, action) => `${subject} ___ ${action}. (ability)`,
    advice: (subject, action) => `${subject} probably ___ ${action}. (advice)`,
    obligation: (subject, action) => `${subject} really ___ ${action} right now. (obligation)`,
    necessity: (subject, action) => `${subject} ___ ${action}, according to the rules. (necessity)`,
};

const ALL_TYPES: ModalType[] = ["ability", "obligation", "advice", "necessity"];

export const modalVerbsRule: GrammarRuleMeta = {
    key: "modal-verbs",
    level: "A2",
    generateExercises(count) {
        return generateBatch(count, () => {
            const subject = pickOne(SUBJECTS);
            const action = pickOne(ACTIONS);
            const type = pickOne(ALL_TYPES);
            const correct = modalFor(type, subject);

            const otherTypes = ALL_TYPES.filter((t) => t !== type);
            const distractors = otherTypes.map((t) => modalFor(t, subject));

            return buildQuestion(FRAMES[type](subject.text, action), correct, distractors);
        });
    },
};
