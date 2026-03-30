'use client';


type SoundButtonProps = {
    word: string;
}

function detectLang(word: string): string {
    if (/[\u0400-\u04FF]/.test(word)) return 'ru-RU';
    return 'en-US';
}

function SoundButtonEar({word}: SoundButtonProps) {
    function handleSpeak() {
        const lang = detectLang(word);
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = lang;
        utterance.rate = 0.85;

        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find((v) => v.lang.startsWith(lang.split('-')[0]));
        if (voice) utterance.voice = voice;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    return (
        <button
            onClick={handleSpeak}
            className="flex mx-auto items-center justify-center cursor-pointer mt-4 mb-4 p-6 rounded-full border border-[rgba(37,177,95,0.3)] bg-[rgb(248,249,245)]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" className="lucide lucide-volume2 w-4 h-4 text-[rgb(37,177,95)]">
                <path
                    d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                <path d="M16 9a5 5 0 0 1 0 6"></path>
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
            </svg>
        </button>
    );
}

export default SoundButtonEar;