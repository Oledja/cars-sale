import axios, { AxiosError } from "axios";
import { userAuthSlice } from "../store/reducers/UserSlice";
import { AppDispatch } from "../store/store";
import { errorHandler } from "../hepler/errorsHandler";
import { IUserRegistration } from "../interfaces/user/IUserRegistration";
import { IUserAuthResponse } from "../interfaces/user/IUserAuthResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default class AuthService {
    static login =
        (loginUser: { email: string; password: string }) =>
        async (dispatch: AppDispatch): Promise<void> => {
            try {
                dispatch(userAuthSlice.actions.isProcessing(true));

                const response = await axios.post<IUserAuthResponse>(
                    apiUrl + "/sessions/auth/login",
                    {
                        ...loginUser,
                    },
                    {
                        withCredentials: true,
                    }
                );

                const { data: user } = response;
                dispatch(userAuthSlice.actions.login(user));
            } catch (error) {
                const { message } = errorHandler(error as AxiosError);

                dispatch(userAuthSlice.actions.authError(message));

                setTimeout(() => {
                    dispatch(userAuthSlice.actions.authError(""));
                }, 2000);
                throw error;
            }
        };

    static registration =
        (user: IUserRegistration) =>
        async (dispatch: AppDispatch): Promise<void> => {
            const bodyFormData = new FormData();

            bodyFormData.append("firstname", user.firstname);
            bodyFormData.append("lastname", user.lastname);
            bodyFormData.append("email", user.email);
            bodyFormData.append("password", user.password);
            bodyFormData.append("phone", user.phone);
            bodyFormData.append("city", user.city);

            if (user.avatar) {
                bodyFormData.append("avatar", user.avatar);
            }

            try {
                dispatch(userAuthSlice.actions.isProcessing(true));

                await axios.post<IUserAuthResponse>(
                    apiUrl + "/sessions/auth/registration",
                    bodyFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                dispatch(userAuthSlice.actions.isProcessing(false));
            } catch (error) {
                const { message } = errorHandler(error as AxiosError);

                dispatch(userAuthSlice.actions.authError(message));

                setTimeout(() => {
                    dispatch(userAuthSlice.actions.authError(""));
                }, 2000);

                throw error;
            }
        };

    static refreshTokens =
        (authUser: IUserAuthResponse) => async (dispatch: AppDispatch) => {
            try {
                dispatch(userAuthSlice.actions.refreshTokens(authUser));
            } catch (error) {
                dispatch(userAuthSlice.actions.authError(""));
                throw error;
            }
        };

    static logout = () => async (dispatch: AppDispatch) => {
        try {
            dispatch(userAuthSlice.actions.isProcessing(true));

            await axios.delete(apiUrl + "/sessions/auth/logout", {
                withCredentials: true,
            });

            dispatch(userAuthSlice.actions.logout());
        } catch (error) {
            dispatch(userAuthSlice.actions.authError(""));
            throw error;
        }
    };
}
