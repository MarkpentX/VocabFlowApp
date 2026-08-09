export interface User {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    passwordHash: string | null;
    image: string | null;
}

export interface SessionUser {
    id: string;
    name?: string;
    username?: string;
    email?: string;
}

export interface NewUserInput {
    username: string;
    password: string;
}
