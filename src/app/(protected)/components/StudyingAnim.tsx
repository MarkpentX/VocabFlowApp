import React from 'react';
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

function StudyingAnim() {
    return (
        <div className="flex items-center justify-center">
            <DotLottieReact
                src="/studyingAnim.lottie"
                loop
                autoplay
                className="w-160 h-78 mb-20 lg:w-260 lg:h-auto"
            />
        </div>
    );
}

export default StudyingAnim;