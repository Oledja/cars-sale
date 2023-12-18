declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_PASSWORD: string;
            DB_USERNAME: string;
            DB_NAME: string;
            DB_PORT: number;
            APP_PORT: number;
            APP_URL: string;
            COOKIE_MAX_AGE: number;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REDIRECT_URL: string;
            FACEBOOK_CLIENT_ID: string;
            FACEBOOK_CLIENT_SECRET: string;
            FACEBOOK_REDIRECT_URL: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
        }
    }
}

export {};
