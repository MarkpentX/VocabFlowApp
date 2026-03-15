import "./globals.css";
import Header from "@/features/header/Header";
import {Toaster} from "react-hot-toast";
import { Space_Grotesk, DM_Sans } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ["vietnamese"],
})

const dMSans = DM_Sans({
    subsets: ["latin"],
})

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
