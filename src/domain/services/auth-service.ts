export interface CredentialsSignInResult {
    ok: boolean;
    error?: string;
}

export interface AuthService {
    signInWithCredentials(username: string, password: string, captchaToken: string): Promise<CredentialsSignInResult>;
}
