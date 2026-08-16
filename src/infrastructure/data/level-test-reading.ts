import { LevelTestQuestion } from "@/domain/entities/level-test";

const WORKING_FROM_HOME = `Over the past few years, more and more companies have allowed their employees to work from home instead of coming into an office every day. This change was accelerated by the global pandemic, when many businesses had no choice but to let staff work remotely. Even after the pandemic ended, however, a large number of companies decided to continue offering this option.

There are several reasons why employees often prefer working from home. First, they save time and money because they do not need to travel to an office. Second, many people feel they can concentrate better when they are not interrupted by colleagues throughout the day. Third, working from home makes it easier for parents to take care of their children while still doing their jobs.

However, working from home is not perfect for everyone. Some people miss the social contact they used to have with their co-workers. Others find it difficult to stop working at the end of the day, because their home and their office are now the same place. A few employees also say that they feel less connected to their company's culture when they rarely meet their colleagues in person.

Because of these mixed experiences, many companies now offer a hybrid model. In a hybrid model, employees come to the office on some days and work from home on others. Managers hope that this approach will combine the benefits of both styles of working. Early studies suggest that most employees are happy with this compromise, although a small number still say they would prefer to work from home every day.`;

const FAST_FASHION = `In the last two decades, the way people buy clothes has changed dramatically. A trend known as 'fast fashion' has emerged, in which clothing retailers produce huge quantities of inexpensive garments and update their collections every few weeks, rather than every season. This business model allows customers to buy the latest styles at very low prices, but it comes with significant hidden costs.

One of the most serious problems associated with fast fashion is its environmental impact. Producing clothes requires large amounts of water, energy, and raw materials such as cotton or synthetic fibres derived from oil. Because fast fashion garments are often designed to be worn only a few times before being discarded, this consumption happens on an enormous scale. Textile waste has become one of the fastest-growing categories of rubbish in many countries, and much of it ends up in landfills or is incinerated rather than recycled.

A second concern involves the working conditions of the people who make these clothes. To keep prices low, many fast fashion brands manufacture their products in countries where labour costs are cheap and regulations are weaker. Investigations by journalists and human rights organisations have repeatedly uncovered factories where workers are paid very little and required to work long hours in unsafe conditions. Although several major retailers have promised to improve conditions in their supply chains, critics argue that genuine change has been slow.

In response to these criticisms, a growing number of consumers have begun to embrace what is sometimes called 'slow fashion'. This alternative approach encourages people to buy fewer, higher-quality garments that are designed to last for years rather than weeks. Some shoppers now choose to purchase second-hand clothing, repair damaged items instead of discarding them, or support brands that are transparent about their environmental and labour practices. Whether this shift will be large enough to meaningfully change the industry, however, remains to be seen. Fast fashion continues to dominate the market, and price remains the most important factor for many shoppers when deciding what to buy.`;

const PROCRASTINATION = `Procrastination, the act of delaying or postponing tasks despite knowing that this delay may have negative consequences, is often misunderstood as a simple failure of time management or willpower. In reality, psychological research suggests that procrastination is far more complex, rooted in the way humans regulate their emotions rather than merely their schedules.

According to this emotion-regulation perspective, people procrastinate primarily to avoid negative feelings associated with a task, such as anxiety, boredom, self-doubt, or frustration. When faced with a task that triggers these emotions, the brain seeks short-term relief by turning to something more immediately rewarding, such as browsing social media or tidying a desk. This provides a temporary sense of comfort, but it does nothing to address the underlying task, which often becomes more stressful the longer it is postponed. Researchers describe this as a kind of short-term mood repair that creates long-term problems, since the anxiety associated with the original task tends to grow rather than shrink over time.

Interestingly, studies have found that procrastination is not consistently linked to laziness or a lack of discipline. Many chronic procrastinators are highly capable individuals who perform demanding jobs competently once they finally begin a task. What distinguishes them is not ability but a particular relationship with discomfort: they are especially inclined to prioritise their present emotional state over their future well-being, a tendency psychologists sometimes call 'present bias'.

Several strategies have been proposed to help people manage procrastination more effectively. One widely recommended approach involves breaking a large, intimidating task into smaller, more manageable steps, which can reduce the emotional intensity associated with starting. Another strategy, known as 'temptation bundling', pairs an unpleasant task with something enjoyable, such as listening to a favourite podcast only while doing household chores. Self-compassion has also emerged as a surprisingly effective tool: research indicates that people who forgive themselves for having procrastinated in the past are less likely to procrastinate again, whereas those who harshly criticise themselves often fall into a repeating cycle of avoidance and guilt.

Ultimately, viewing procrastination through the lens of emotion regulation rather than moral failure has significant implications. It suggests that interventions focused purely on productivity techniques, such as strict scheduling apps, may address only the surface of the problem. Lasting change, researchers argue, is more likely to come from strategies that help individuals manage the emotional discomfort a task provokes, rather than from simply demanding more discipline.`;

export const LEVEL_TEST_READING_QUESTIONS: LevelTestQuestion[] = [
    // Passage 1 — B1
    {
        section: "reading",
        level: "B1",
        passage: WORKING_FROM_HOME,
        question: "True, False, or Not Given: Some companies continued to allow remote work even after the pandemic was over.",
        correct: "True",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B1",
        passage: WORKING_FROM_HOME,
        question: "True, False, or Not Given: According to the passage, all employees prefer working from home to working in an office.",
        correct: "False",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B1",
        passage: WORKING_FROM_HOME,
        question: "True, False, or Not Given: Most companies pay for their employees' home internet connection when they work remotely.",
        correct: "Not Given",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B1",
        passage: WORKING_FROM_HOME,
        question: "According to the passage, why do some employees find it hard to separate work and personal life at home?",
        correct: "Because their home and their office are now the same place.",
        answers: [
            "Because their home and their office are now the same place.",
            "Because they have to travel to the office every day.",
            "Because they miss their colleagues.",
            "Because managers require them to work longer hours.",
        ],
    },
    {
        section: "reading",
        level: "B1",
        passage: WORKING_FROM_HOME,
        question: "What do early studies suggest about the hybrid model, according to the passage?",
        correct: "Most employees are happy with this compromise.",
        answers: [
            "Most employees are happy with this compromise.",
            "Most employees want to return to the office full-time.",
            "Most employees are unhappy with hybrid work.",
            "Most companies plan to stop offering hybrid work.",
        ],
    },

    // Passage 2 — B2
    {
        section: "reading",
        level: "B2",
        passage: FAST_FASHION,
        question: "True, False, or Not Given: Fast fashion retailers typically update their collections more often than traditional seasonal releases.",
        correct: "True",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B2",
        passage: FAST_FASHION,
        question: "True, False, or Not Given: The passage states that all major clothing retailers have ignored criticism about working conditions.",
        correct: "False",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B2",
        passage: FAST_FASHION,
        question: "True, False, or Not Given: The passage mentions the name of a specific fast fashion company.",
        correct: "Not Given",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "B2",
        passage: FAST_FASHION,
        question: "According to the passage, why is textile waste increasing?",
        correct: "Because fast fashion garments are often worn only a few times before being thrown away.",
        answers: [
            "Because fast fashion garments are often worn only a few times before being thrown away.",
            "Because clothing factories are closing down.",
            "Because recycling technology has improved.",
            "Because customers are buying fewer clothes.",
        ],
    },
    {
        section: "reading",
        level: "B2",
        passage: FAST_FASHION,
        question: "What does the passage suggest about the future of slow fashion's impact on the industry?",
        correct: "It is uncertain whether slow fashion will significantly change the industry.",
        answers: [
            "It is uncertain whether slow fashion will significantly change the industry.",
            "Slow fashion has already replaced fast fashion as the dominant model.",
            "Slow fashion will disappear within a few years.",
            "Governments have banned fast fashion production.",
        ],
    },

    // Passage 3 — C1
    {
        section: "reading",
        level: "C1",
        passage: PROCRASTINATION,
        question: "True, False, or Not Given: Procrastination is more closely linked to emotion regulation than to time management skills.",
        correct: "True",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "C1",
        passage: PROCRASTINATION,
        question: "True, False, or Not Given: The passage states that procrastination is always caused by laziness.",
        correct: "False",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "C1",
        passage: PROCRASTINATION,
        question: "True, False, or Not Given: The passage mentions a specific percentage of people who regularly procrastinate.",
        correct: "Not Given",
        answers: ["True", "False", "Not Given"],
    },
    {
        section: "reading",
        level: "C1",
        passage: PROCRASTINATION,
        question: "According to the passage, what is 'temptation bundling'?",
        correct: "Combining an unpleasant task with an enjoyable activity.",
        answers: [
            "Combining an unpleasant task with an enjoyable activity.",
            "Breaking a task into smaller steps.",
            "Forgiving yourself for procrastinating.",
            "Using a strict scheduling app.",
        ],
    },
    {
        section: "reading",
        level: "C1",
        passage: PROCRASTINATION,
        question: "What does the passage suggest about self-criticism after procrastinating?",
        correct: "It tends to make people more likely to procrastinate again.",
        answers: [
            "It tends to make people more likely to procrastinate again.",
            "It has no effect on future procrastination.",
            "It always motivates people to work harder next time.",
            "It is recommended by researchers as an effective strategy.",
        ],
    },
];
