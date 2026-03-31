'use client';   // ← Добавь эту строку сверху

import React from 'react';
import Typewriter from 'typewriter-effect';

type TextWriterProps = {
    text: string;
};

function TextWriter({ text }: TextWriterProps) {
    return (
        <Typewriter
            options={{
                strings: [text],
                autoStart: true,
                loop: false,
                delay: 50,
                deleteSpeed: Infinity,
                cursor: '|',
            }}
        />
    );
}

export default TextWriter;