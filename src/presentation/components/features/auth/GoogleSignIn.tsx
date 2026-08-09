import { signIn } from "@/infrastructure/auth/auth"
import { GoogleButton } from "@/presentation/components/features/auth/GoogleSignInBtn"
import { getLocale } from "next-intl/server"

export default async function GoogleSignIn() {
    const locale = await getLocale();

    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", {
                    redirectTo: `/${locale}/dashboard`,
                })
            }}
        >
            <GoogleButton />
        </form>
    )
}
