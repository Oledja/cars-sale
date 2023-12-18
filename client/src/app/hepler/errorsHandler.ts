import { AxiosError, InternalAxiosRequestConfig } from "axios";

export const errorHandler = (
    error: Error
): {
    status: number;
    message: string;
    config: InternalAxiosRequestConfig<any> | undefined;
} => {
    const { config, response } = error as AxiosError<{ message: string }>;
    if (response) {
        const {
            data: { message },
        } = response;

        if (!message) {
            return {
                status: 500,
                message: "The service is not work, please try later",
                config,
            };
        }
        return { status: response.status, message, config };
    } else {
        return {
            status: 500,
            message: "The service is not work, please try later",
            config,
        };
    }
};
