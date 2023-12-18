import axios from "axios";
import { errorHandler } from "../../hepler/errorsHandler";
import AuthService from "../../services/AuthService";
import { IUserAuthResponse } from "../../interfaces/user/IUserAuthResponse";
import { store } from "../../store/StoreProvider";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
});

api.interceptors.request.use(async (config) => {
    const { tokens } = store.getState().userAuthReducer;

    config.headers.Authorization = `Bearer ${
        store.getState().userAuthReducer.tokens.accessToken
    }`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status, config: originalConfig } = errorHandler(error);

        if (!originalConfig) {
            return Promise.reject(error);
        }

        if (
            status === 401 &&
            originalConfig.url !== apiUrl + "/sessions/auth/refresh"
        ) {
            try {
                const response = await axios.get<IUserAuthResponse>(
                    apiUrl + "/sessions/auth/refresh",
                    {
                        withCredentials: true,
                    }
                );

                const { data: user } = response;

                await store.dispatch(AuthService.refreshTokens(user));

                return api.request(originalConfig);
            } catch (error) {
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;
