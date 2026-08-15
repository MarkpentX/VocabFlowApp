import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Space_Grotesk, DM_Sans, Geist } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
    subsets: ["vietnamese"],
});

const dMSans = DM_Sans({
    subsets: ["latin"],
});

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("title"),
        description: t("description"),
        icons: {
            icon: "/favicon.svg",
        },
    };
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={cn(spaceGrotesk.className, dMSans.className, "font-sans", geist.variable)}>
        <body className="bg-[rgb(248,249,245)]">
        <NextIntlClientProvider>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            {children}
        </NextIntlClientProvider>
        <Analytics/>
        </body>
        </html>
    );
}
