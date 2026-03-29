import { signIn } from "@/auth"
import {GoogleButton} from "@/app/auth/_components/GoogleSignInBtn";

export default function GoogleSignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", {
                    redirectTo: "/dashboard",
                })
            }}
        >
            <GoogleButton />
        </form>
    )
}