import React from "react";

interface CoinIconProps {
    size?: number;
}

function CoinIcon({ size = 32 }: CoinIconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
                <linearGradient id="coinRimGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF3B0" />
                    <stop offset="35%" stopColor="#FFC93D" />
                    <stop offset="100%" stopColor="#C97A0F" />
                </linearGradient>
                <linearGradient id="coinOuterGradient" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFEA8A" />
                    <stop offset="50%" stopColor="#FFC220" />
                    <stop offset="100%" stopColor="#E8901A" />
                </linearGradient>
                <linearGradient id="coinInnerGradient" x1="9" y1="9" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF6C4" />
                    <stop offset="55%" stopColor="#FFD23F" />
                    <stop offset="100%" stopColor="#F5A80F" />
                </linearGradient>
                <radialGradient id="coinGloss" cx="32%" cy="26%" r="45%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
                <filter id="coinShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#B8600A" floodOpacity="0.45" />
                </filter>
            </defs>

            <g filter="url(#coinShadow)">
                <circle cx="20" cy="20" r="18" fill="url(#coinRimGradient)" />
                <circle cx="20" cy="20" r="15.4" fill="url(#coinOuterGradient)" />
                <circle cx="20" cy="20" r="15.4" fill="none" stroke="#FFF6C4" strokeOpacity="0.5" strokeWidth="0.6" />

                <circle cx="20" cy="20" r="12.6" fill="url(#coinInnerGradient)" stroke="#C97A0F" strokeOpacity="0.4" strokeWidth="0.6" />

                <path
                    d="M20 12 L22.6 17.9 L29 18.5 L24.2 22.6 L25.7 28.9 L20 25.4 L14.3 28.9 L15.8 22.6 L11 18.5 L17.4 17.9 Z"
                    fill="#B8600A"
                    fillOpacity="0.28"
                    transform="translate(0.5, 0.6)"
                />
                <path
                    d="M20 12 L22.6 17.9 L29 18.5 L24.2 22.6 L25.7 28.9 L20 25.4 L14.3 28.9 L15.8 22.6 L11 18.5 L17.4 17.9 Z"
                    fill="#FFF6C4"
                    stroke="#F5A80F"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                />

                <circle cx="20" cy="20" r="18" fill="url(#coinGloss)" />

                <path
                    d="M9.5 13C11.8 8.8 15.3 6.8 19.5 6.8"
                    stroke="#FFFDF0"
                    strokeOpacity="0.75"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                />
            </g>
        </svg>
    );
}

export default CoinIcon;
