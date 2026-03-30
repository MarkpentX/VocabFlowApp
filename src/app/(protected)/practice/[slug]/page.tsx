import HeaderBackArrow from "@/app/(protected)/tags/_components/HeaderBackArrow";
import ModeItem from "@/app/(protected)/practice/[slug]/ModeItem";
import React from "react";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const modes = [
        {
            img: "/translate.svg",
            url: "by-translate",
            title: "By translate",
            description: "Write the translation of the words"
        },
        {
            img: "/earphone.svg",
            url: "by-ear",
            title: "By ear",
            description: "Hear and write the word"
        },
        {
            img: "/exam.svg",
            url: "quiz",
            title: "Translate",
            description: "Select right meaning"
        }
    ];

    return (
        <>
            <HeaderBackArrow title="Practice mode" href="/practice"  />

            <main className="max-w-md mx-auto px-6 mt-6">
                <h1 className="text-center text-black text-2xl font-bold mb-6">
                    Select mode
                </h1>

                <nav className="grid gap-4">
                    {modes.map(item => (
                        <ModeItem
                            key={item.title}
                            url={item.url}
                            slug={params}
                            img={item.img}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </nav>
            </main>
        </>
    );
}