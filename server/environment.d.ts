declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_PASSWORD: string;
            DB_USERNAME: string;
            DB_NAME: string;
            DB_PORT: number;
            APP_PORT: number;
            COOKIE_MAX_AGE: number;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
        }
    }
}

export {};
