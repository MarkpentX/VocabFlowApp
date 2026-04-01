import React from 'react';
import GoogleSignIn from "@/app/auth/_components/GoogleSignIn";
import SignInForm from "@/app/auth/_components/SignInForm";

function Page() {
    return (
        <main className="flex flex-col items-center justify-center h-dvh ">
            <h1 className="text-green-600 text-3xl mb-1 text-center font-bold font-spaceGrotesk md:text-4xl">VocabFlow</h1>
            <p className="mb-4 text-[rgb(103,126,119)]">Continue to start learning languages </p>
            <GoogleSignIn />
            <SignInForm/>
        </main>
    );
}

export default Page;