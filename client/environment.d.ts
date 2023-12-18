declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
            NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
            NEXT_PUBLIC_GOOGLE_REDIRECT_URL: string;
            NEXT_PUBLIC_FACEBOOK_CLIENT_ID: string;
            NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: string;
            NEXT_PUBLIC_FACEBOOK_REDIRECT_URL: string;
            NEXT_PUBLIC_API_URL: string;
        }
    }
}

export {};
