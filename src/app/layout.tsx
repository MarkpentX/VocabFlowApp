import "./globals.css";
import {Toaster} from "react-hot-toast";
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import type {Metadata} from "next";

const spaceGrotesk = Space_Grotesk({
    subsets: ["vietnamese"],
})

const dMSans = DM_Sans({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "VocabFlow — Vocabulary Trainer for Language Learning",
    description:
        "Learn languages faster with VocabFlow. Save vocabulary, organize words with tags, and practice with quizzes to remember new words easily.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.className} ${dMSans.className}`}>
        <body className="bg-[rgb(248,249,245)]">
        <Toaster
            position="top-center"
            reverseOrder={true}
        />
        {children}
        </body>
        </html>
    );
}
