import { NextResponse } from "next/server";
import { translateWord } from "@/infrastructure/container";
import { isDomainError } from "@/domain/errors/type-guard";
import { WORD_LANGUAGES, WordLanguage } from "@/domain/entities/word";

function isWordLanguage(value: unknown): value is WordLanguage {
    return typeof value === "string" && (WORD_LANGUAGES as readonly string[]).includes(value);
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);

    if (
        !body ||
        typeof body.text !== "string" ||
        !isWordLanguage(body.source) ||
        !isWordLanguage(body.target)
    ) {
        return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    try {
        const translation = await translateWord({
            text: body.text,
            sourceLang: body.source,
            targetLang: body.target,
        });
        return NextResponse.json({ translation });
    } catch (err) {
        if (isDomainError(err)) {
            return NextResponse.json({ error: "translation_unavailable" }, { status: 502 });
        }
        return NextResponse.json({ error: "unexpected" }, { status: 500 });
    }
}
