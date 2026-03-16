
import {signOut} from "@/auth"
import React from "react";

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }}
        >
            <button type="submit" className="gap-2 flex items-center font-dMSans font-medium border-1 border-gray-200 px-3 rounded-md py-1.5 text-sm hover:bg-green-200 transition-colors duration-200 animate-[fadeInUp_0.6s_ease-out_forwards]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-log-out w-4 h-4">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
                Logout
            </button>
        </form>
    )
}