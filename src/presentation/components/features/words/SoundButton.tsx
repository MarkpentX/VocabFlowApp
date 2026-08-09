"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { WordLanguage } from "@/domain/entities/word";

type SoundButtonProps = {
    word: string;
    lang: WordLanguage;
    className?: string;
};

const SPEECH_LOCALES: Record<WordLanguage, string> = {
    en: "en-US",
    ru: "ru-RU",
    uk: "uk-UA",
};

function pickVoice(voices: SpeechSynthesisVoice[], locale: string): SpeechSynthesisVoice | undefined {
    const languageFamily = locale.split("-")[0];
    return (
        voices.find((voice) => voice.lang === locale) ??
        voices.find((voice) => voice.lang.toLowerCase().startsWith(languageFamily))
    );
}

// Shared by every SoundButton on the page. Each button only ever paused its OWN previous
// audio, so if word A's request was still in flight (or still playing) when word B's button
// was clicked, A could start/finish playing after B and sound like "the wrong word". Tracking
// the one audio/utterance that's actually allowed to be active, page-wide, fixes that.
let activeAudio: HTMLAudioElement | null = null;

function stopEverythingPlaying() {
    activeAudio?.pause();
    activeAudio = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}

function SoundButton({ word, lang, className }: SoundButtonProps) {
    const t = useTranslations("tts");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            return;
        }

        function loadVoices() {
            voicesRef.current = window.speechSynthesis.getVoices();
        }

        loadVoices();
        window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
        return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    }, []);

    // Kept as a fallback for when the TTS proxy fails (network issues, upstream blocked, etc.).
    const speakWithBrowserVoice = useCallback(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            toast.error(t("noVoiceAvailable"));
            return;
        }

        const locale = SPEECH_LOCALES[lang];
        const voice = pickVoice(voicesRef.current, locale);

        if (voicesRef.current.length > 0 && !voice) {
            toast.error(t("noVoiceAvailable"));
            return;
        }

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = locale;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        if (voice) {
            utterance.voice = voice;
        }
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        // Chrome keeps a single, page-wide speech queue: calling speak() in the same tick as
        // cancel() is unreliable and can leave the engine stuck replaying an earlier utterance.
        // Holding a ref (so this utterance isn't garbage-collected mid-speech) and giving cancel()
        // a tick to actually flush before queuing the new one avoids that.
        utteranceRef.current = utterance;
        window.speechSynthesis.cancel();
        setTimeout(() => {
            if (utteranceRef.current === utterance) {
                window.speechSynthesis.speak(utterance);
            }
        }, 50);
    }, [word, lang, t]);

    const handleSpeak = useCallback(() => {
        stopEverythingPlaying();

        const audio = new Audio(`/api/tts?text=${encodeURIComponent(word)}&lang=${lang}`);
        activeAudio = audio;

        let fallbackTriggered = false;
        const triggerFallback = () => {
            // Ignore late errors from an audio object that's no longer the active one
            // (the user already moved on to another word).
            if (fallbackTriggered || activeAudio !== audio) {
                return;
            }
            fallbackTriggered = true;
            setIsSpeaking(false);
            speakWithBrowserVoice();
        };

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
            setIsSpeaking(false);
            if (activeAudio === audio) {
                activeAudio = null;
            }
        };
        audio.onerror = triggerFallback;

        audio.play().catch(triggerFallback);
    }, [word, lang, speakWithBrowserVoice]);

    return (
        <button
            type="button"
            onClick={handleSpeak}
            aria-label={word}
            data-speaking={isSpeaking}
            className={cn("cursor-pointer p-2 -m-2 rounded-full hover:bg-black/5 active:scale-95 transition", className)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" className="lucide lucide-volume2 w-[18px] h-[18px] text-[rgb(37,177,95)]">
                <path
                    d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                <path d="M16 9a5 5 0 0 1 0 6"></path>
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
            </svg>
        </button>
    );
}

export default SoundButton;
