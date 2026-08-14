import { LevelTestQuestion } from "@/domain/entities/level-test";

export const LEVEL_TEST_QUESTIONS: LevelTestQuestion[] = [
    { level: "A1", question: "She ___ a doctor.", correct: "is", answers: ["is", "are", "be", "am"] },
    { level: "A1", question: "What is the opposite of 'big'?", correct: "small", answers: ["small", "tall", "long", "heavy"] },
    { level: "A1", question: "I ___ breakfast at 8 am every day.", correct: "have", answers: ["have", "having", "has", "haves"] },
    { level: "A1", question: "Choose the correct word: 'a ___ of water'", correct: "glass", answers: ["glass", "piece", "slice", "pair"] },
    { level: "A1", question: "They ___ to school by bus.", correct: "go", answers: ["go", "goes", "going", "went to"] },

    { level: "A2", question: "Yesterday I ___ a movie with my friends.", correct: "watched", answers: ["watched", "watch", "watching", "watches"] },
    { level: "A2", question: "What does 'borrow' mean?", correct: "to take something and give it back later", answers: ["to take something and give it back later", "to buy something new", "to lose something", "to give something as a gift"] },
    { level: "A2", question: "If it rains tomorrow, we ___ stay home.", correct: "will", answers: ["will", "would", "are", "did"] },
    { level: "A2", question: "Choose the synonym of 'happy'.", correct: "glad", answers: ["glad", "angry", "tired", "bored"] },
    { level: "A2", question: "She has ___ finished her homework.", correct: "already", answers: ["already", "yet", "still", "ever"] },

    { level: "B1", question: "What does 'to give up' mean?", correct: "to stop trying", answers: ["to stop trying", "to start again", "to succeed", "to celebrate"] },
    { level: "B1", question: "By the time we arrived, the film ___.", correct: "had already started", answers: ["had already started", "already started", "has already started", "starts already"] },
    { level: "B1", question: "Choose the word closest in meaning to 'reliable'.", correct: "trustworthy", answers: ["trustworthy", "expensive", "fragile", "temporary"] },
    { level: "B1", question: "He apologized ___ being late.", correct: "for", answers: ["for", "of", "about", "with"] },
    { level: "B1", question: "What does 'run out of' mean?", correct: "to have no more of something", answers: ["to have no more of something", "to run very fast", "to exit a building", "to start a race"] },

    { level: "B2", question: "Choose the best synonym for 'reluctant'.", correct: "unwilling", answers: ["unwilling", "eager", "certain", "curious"] },
    { level: "B2", question: "Had I known about the traffic, I ___ earlier.", correct: "would have left", answers: ["would have left", "will leave", "left", "would leave"] },
    { level: "B2", question: "What does 'to bring up' a topic mean?", correct: "to introduce it in conversation", answers: ["to introduce it in conversation", "to raise a child", "to lift something heavy", "to cancel a plan"] },
    { level: "B2", question: "Her argument was so ___ that no one could disagree.", correct: "compelling", answers: ["compelling", "boring", "vague", "irrelevant"] },
    { level: "B2", question: "Choose the correct phrase: 'She is used to ___ up early.'", correct: "waking", answers: ["waking", "wake", "woke", "waken"] },

    { level: "C1", question: "Choose the word closest in meaning to 'meticulous'.", correct: "extremely careful", answers: ["extremely careful", "very fast", "somewhat lazy", "highly emotional"] },
    { level: "C1", question: "The committee's decision was met with ___ criticism.", correct: "widespread", answers: ["widespread", "narrow", "brief", "silent"] },
    { level: "C1", question: "What does 'to be at odds with' someone mean?", correct: "to disagree with them", answers: ["to disagree with them", "to work closely with them", "to admire them", "to ignore them completely"] },
    { level: "C1", question: "Choose the best synonym for 'ambiguous'.", correct: "unclear", answers: ["unclear", "obvious", "accurate", "detailed"] },
    { level: "C1", question: "Despite the setbacks, she remained remarkably ___.", correct: "resilient", answers: ["resilient", "fragile", "indifferent", "hesitant"] },
];
