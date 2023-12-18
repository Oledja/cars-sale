import api from "../components/http";
import { userAuthSlice } from "../store/reducers/UserSlice";
import { AppDispatch } from "../store/store";
import { IUserResponse } from "../interfaces/user/IUserResponse";
import { IUserUpdate } from "../interfaces/user/IUserUpdate";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default class UserService {
    // static getUser =
    //     () =>
    //     async (dispatch: AppDispatch): Promise<void> => {
    //         try {
    //             dispatch(userAuthSlice.actions.isProcessing(true));

    //             const response = await api.get<IUserResponse>(apiUrl + "/users/profile");
    //             const { data: user } = response;

    //             dispatch(userAuthSlice.actions.getUser(user));
    //         } catch (error) {
    //             const { message } = errorHandler(error as AxiosError);

    //             dispatch(userAuthSlice.actions.setError(message));

    //             setTimeout(() => {
    //                 dispatch(userAuthSlice.actions.setError(""));
    //             }, 2000);

    //             throw error;
    //         }
    // };

    static updateUser =
        (updateUser: IUserUpdate) =>
        async (dispatch: AppDispatch): Promise<void> => {
            try {
                const bodyFormData = new FormData();
                bodyFormData.append("firstname", updateUser.firstname || "");
                bodyFormData.append("lastname", updateUser.lastname || "");
                bodyFormData.append("email", updateUser.email || "");
                bodyFormData.append(
                    "currentPassword",
                    updateUser.currentPassword || ""
                );
                bodyFormData.append(
                    "newPassword",
                    updateUser.newPassword || ""
                );
                bodyFormData.append("phone", updateUser.phone || "");
                bodyFormData.append("city", updateUser.city || "");
                bodyFormData.append("avatarPath", updateUser.avatarPath || "");
                bodyFormData.append("avatar", updateUser.avatar || "");

                dispatch(userAuthSlice.actions.isProcessing(true));

                let response = await api.post<IUserResponse>(
                    apiUrl + "/users/update",
                    bodyFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const { data: user } = response;

                dispatch(userAuthSlice.actions.updateUser(user));
            } catch (error) {
                dispatch(userAuthSlice.actions.authError(""));
                throw error;
            }
        };
}
