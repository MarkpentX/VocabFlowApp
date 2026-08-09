import { NextResponse } from "next/server";
import { WORD_LANGUAGES, WordLanguage } from "@/domain/entities/word";

const GOOGLE_TTS_ENDPOINT = "https://translate.google.com/translate_tts";
const USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Google's endpoint caps out around 200 characters per request; vocabulary words never get close.
const MAX_TEXT_LENGTH = 200;
const FETCH_TIMEOUT_MS = 6000;

function isWordLanguage(value: unknown): value is WordLanguage {
    return typeof value === "string" && (WORD_LANGUAGES as readonly string[]).includes(value);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text")?.slice(0, MAX_TEXT_LENGTH) ?? "";
    const lang = searchParams.get("lang");

    if (!text || !isWordLanguage(lang)) {
        return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    const url = `${GOOGLE_TTS_ENDPOINT}?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(text)}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": USER_AGENT, Referer: "https://translate.google.com/" },
            signal: controller.signal,
        });

        if (!res.ok || !res.body) {
            return NextResponse.json({ error: "tts_unavailable" }, { status: 502 });
        }

        return new NextResponse(res.body, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Cache-Control": "public, max-age=86400, immutable",
            },
        });
    } catch {
        return NextResponse.json({ error: "tts_unavailable" }, { status: 502 });
    } finally {
        clearTimeout(timeout);
    }
}
