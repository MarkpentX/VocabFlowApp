import {auth} from "@/auth";
import {redirect} from "next/navigation";

interface SessionUser {
    id: string;
    name?: string;
    email?: string;
}

export async function getSessionUser(): Promise<SessionUser>{
    const session = await auth()
    if (!session?.user?.id){
        redirect("/auth")
    }
    return session.user as SessionUser;
}