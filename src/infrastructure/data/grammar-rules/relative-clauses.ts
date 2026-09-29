import { GrammarRuleMeta } from "@/domain/entities/grammar";
import { BankItem, generateFromBank } from "@/infrastructure/data/grammar-rules/helpers";

// "that" is correct in most defining clauses, so it only appears as an option
// in non-defining clauses (between commas), where it is always wrong.
const BANK: BankItem[] = [
    // who — people
    ["The woman ___ lives next door is a nurse.", "who", "which", "where", "whose"],
    ["Do you know anyone ___ can fix a computer?", "who", "which", "where", "whose"],
    ["The students ___ passed the exam got a certificate.", "who", "which", "where", "whose"],
    ["I don't like people ___ are always late.", "who", "which", "where", "whose"],
    ["Do you remember the teacher ___ taught us English?", "who", "which", "where", "whose"],
    // which — things
    ["This is the book ___ I told you about.", "which", "who", "where", "whose"],
    ["The phone ___ I bought last week has already broken.", "which", "who", "where", "whose"],
    ["The bus ___ goes to the airport leaves every hour.", "which", "who", "where", "whose"],
    ["Is this the key ___ opens the front door?", "which", "who", "where", "whose"],
    ["The laptop ___ I use for work is very old.", "which", "who", "where", "whose"],
    ["This is the restaurant ___ serves the best pizza in town.", "which", "where", "who", "whose"],
    // where — places (followed by a full clause: subject + verb)
    ["That's the café ___ we first met.", "where", "which", "who", "whose"],
    ["Rome is the city ___ my parents got married.", "where", "which", "who", "whose"],
    ["That's the hotel ___ we stayed last summer.", "where", "which", "who", "whose"],
    ["This is the restaurant ___ we had dinner last night.", "where", "which", "who", "whose"],
    ["The village ___ I grew up is much bigger now.", "where", "which", "who", "whose"],
    // whose — possession
    ["I have a friend ___ brother plays for a football team.", "whose", "who", "which", "where"],
    ["The man ___ car was stolen called the police.", "whose", "who", "which", "where"],
    ["She's the singer ___ songs are always on the radio.", "whose", "who", "which", "where"],
    ["The girl ___ bag I found came to thank me.", "whose", "who", "which", "where"],
    ["The boy ___ parents own the shop is in my class.", "whose", "who", "which", "where"],
    // when — times
    ["I'll never forget the day ___ I met you.", "when", "where", "which", "who"],
    // non-defining clauses (with commas) — never "that"
    ["The film, ___ lasted three hours, was really boring.", "which", "that", "who", "where"],
    ["My grandfather, ___ is 90, still drives.", "who", "that", "which", "whose"],
    ["Paris, ___ is the capital of France, is famous for its museums.", "which", "that", "where", "who"],
    ["Anna, ___ sister is a doctor, wants to study medicine too.", "whose", "who", "that", "which"],
];

export const relativeClausesRule: GrammarRuleMeta = {
    key: "relative-clauses",
    level: "B2",
    generateExercises(count) {
        return generateFromBank(BANK, count);
    },
};
