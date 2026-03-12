import "./globals.css";
import Header from "@/features/header/Header";
import {Toaster} from "react-hot-toast";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Toaster
            position="top-center"
            reverseOrder={true}
        />
        <Header/>
        {children}
        </body>
        </html>
    );
}
