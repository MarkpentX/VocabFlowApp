import React from 'react';
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

function StudyingAnim() {
    return (
        <div className="flex items-center justify-center">
            <DotLottieReact
                src="/studyingAnim.lottie"
                loop
                autoplay
                className="w-full h-auto max-w-[420px] px-6 mb-12 sm:max-w-[640px] sm:mb-20 lg:max-w-[1040px]"
            />
        </div>
    );
}

export default StudyingAnim;
