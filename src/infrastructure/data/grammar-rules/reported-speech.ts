import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// Backshift is optional when the statement is still true ("She said she is
// tired" is also correct English), so the unshifted form is never offered as a
// wrong option — only the backshifted form and clear mistakes appear.
const BANK: BankItem[] = [
    // tense backshift
    ["“I am tired,” she said. → She said that she ___ tired.", "was", "were", "am", "be"],
    ["“I like pizza,” Tom said. → Tom said that he ___ pizza.", "liked", "like", "liking", "had like"],
    ["“I will call you,” he said. → He said that he ___ call me.", "would", "was", "woulds", "has"],
    ["“I can swim,” the boy said. → The boy said that he ___ swim.", "could", "cans", "was", "did"],
    ["“We are leaving,” they said. → They said that they ___ leaving.", "were", "was", "have", "be"],
    ["“I have finished,” she said. → She said that she ___ finished.", "had", "have", "was", "did"],
    ["“I saw the film,” he said. → He said that he ___ the film.", "had seen", "has seen", "had saw", "have seen"],
    ["“I'm going to buy a car,” Tom said. → Tom said that he ___ going to buy a car.", "was", "were", "has", "be"],
    ["“I don't know the answer,” she said. → She said that she ___ the answer.", "didn't know", "don't know", "didn't knew", "hadn't know"],
    ["“I must go,” he said. → He said that he ___ go.", "had to", "has to", "have to", "musted"],
    // time words change when the moment has passed
    ["“I'm working today,” she said last week. → She said she was working ___.", "that day", "today", "tomorrow", "yesterday"],
    ["“I'll do it tomorrow,” he said a month ago. → He said he would do it ___.", "the next day", "tomorrow", "yesterday", "today"],
    // questions: statement word order, no "do/did"
    ["“Where do you live?” she asked me. → She asked me where ___.", "I lived", "did I live", "do I live", "lived I"],
    ["“What time is it?” he asked. → He asked what time ___.", "it was", "was it", "is it", "did it be"],
    ["“Are you hungry?” he asked. → He asked ___ I was hungry.", "if", "that", "what", "do"],
    ["“Can you help me?” she asked. → She asked me ___ help her.", "if I could", "could I", "can I", "if could I"],
    // commands and requests: tell / ask + (not) to
    ["“Don't touch it!” Mum said. → Mum told me ___ it.", "not to touch", "don't touch", "not touch", "no touching"],
    ["“Please sit down,” the teacher said. → The teacher asked us ___ down.", "to sit", "sit", "sitting", "sat"],
    ["“Call me tomorrow,” she said. → She told me ___ her the next day.", "to call", "call", "calling", "called"],
    // say vs tell
    ["She ___ me that she was busy.", "told", "said", "spoke", "talked"],
    ["He ___ that he was busy.", "said", "told", "spoke", "talked"],
];

export const reportedSpeechRule: GrammarRuleMeta = {
    key: "reported-speech",
    level: "B2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
