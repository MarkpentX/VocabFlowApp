import { LevelTestQuestion } from "@/domain/entities/level-test";

const TRAIN_ANNOUNCEMENT =
    "Attention passengers. The train to Manchester will now depart from platform four instead of platform two. We apologise for any inconvenience.";

const PHONE_MESSAGE = "Hi, it's Sarah. I'll be about twenty minutes late for our meeting because of traffic. Can we start at half past two instead?";

const SHOP_ANNOUNCEMENT =
    "The store will close early today at six o'clock for staff training. We will reopen tomorrow at our usual time of nine a.m.";

const WEATHER_REPORT =
    "Tomorrow will start cloudy with light rain in the morning, but conditions should improve by early afternoon with sunny spells until evening.";

export const LEVEL_TEST_LISTENING_QUESTIONS: LevelTestQuestion[] = [
    {
        section: "listening",
        level: "A2",
        audioText: TRAIN_ANNOUNCEMENT,
        question: "Which platform will the train depart from?",
        correct: "Platform four",
        answers: ["Platform four", "Platform two", "Platform three", "Platform one"],
    },
    {
        section: "listening",
        level: "A2",
        audioText: TRAIN_ANNOUNCEMENT,
        question: "Where is the train going?",
        correct: "Manchester",
        answers: ["Manchester", "London", "Platform two", "Birmingham"],
    },
    {
        section: "listening",
        level: "B1",
        audioText: PHONE_MESSAGE,
        question: "Why will Sarah be late?",
        correct: "Because of traffic",
        answers: ["Because of traffic", "Because she overslept", "Because her car broke down", "Because of the weather"],
    },
    {
        section: "listening",
        level: "B1",
        audioText: PHONE_MESSAGE,
        question: "What time does Sarah want the meeting to start?",
        correct: "Half past two",
        answers: ["Half past two", "Two o'clock", "Twenty past two", "Half past three"],
    },
    {
        section: "listening",
        level: "B1",
        audioText: SHOP_ANNOUNCEMENT,
        question: "What time will the store close today?",
        correct: "Six o'clock",
        answers: ["Six o'clock", "Nine o'clock", "Five o'clock", "Seven o'clock"],
    },
    {
        section: "listening",
        level: "B1",
        audioText: SHOP_ANNOUNCEMENT,
        question: "Why is the store closing early?",
        correct: "For staff training",
        answers: ["For staff training", "For a public holiday", "Because of a power cut", "For cleaning"],
    },
    {
        section: "listening",
        level: "B2",
        audioText: WEATHER_REPORT,
        question: "What is the weather like in the morning?",
        correct: "Cloudy with light rain",
        answers: ["Cloudy with light rain", "Sunny", "Heavy snow", "Strong wind"],
    },
    {
        section: "listening",
        level: "B2",
        audioText: WEATHER_REPORT,
        question: "When will conditions improve?",
        correct: "By early afternoon",
        answers: ["By early afternoon", "In the evening", "Late at night", "Immediately"],
    },
];
