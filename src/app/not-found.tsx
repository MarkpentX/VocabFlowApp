import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import Header from "@/components/Header";

function NotFound() {
    return (
    <>
        <Header/>
        <main className="flex items-center justify-center h-screen w-full flex-col">
            <div className="w-86 h-86 lg:w-200 lg:h-200">
                <DotLottieReact
                    src="/404-error-animation.lottie"
                    loop
                    autoplay
                />
            </div>
        </main>
    </>
    );
}

export default NotFound;