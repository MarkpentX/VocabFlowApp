import React from 'react';
import GoogleSignIn from "@/app/auth/_components/GoogleSignIn";

function Page() {
    return (
        <main>
            <h1>Auth Page</h1>
            <GoogleSignIn />
        </main>
    );
}

export default Page;