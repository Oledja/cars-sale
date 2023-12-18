import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../interfaces/user/IUserState";
import { IUserAuthResponse } from "../../interfaces/user/IUserAuthResponse";
import { IUserResponse } from "../../interfaces/user/IUserResponse";
import { ITokens } from "../../interfaces/token/ITokens";
import axios, { AxiosError } from "axios";
import { errorHandler } from "../../hepler/errorsHandler";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState: IUserState = {
    user: {} as IUserResponse,
    tokens: {} as ITokens,
    isAuth: false,
    isProcessing: false,
    error: "",
};

export const getUserAuth = createAsyncThunk(
    "getAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<IUserAuthResponse>(
                apiUrl + "/sessions/auth/refresh",
                {
                    withCredentials: true,
                }
            );

            const { data: user } = response;
            return user;
        } catch (error) {
            const { message } = errorHandler(error as AxiosError);
            return rejectWithValue(message);
        }
    }
);
const a = getUserAuth.pending;

const userAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isProcessing(state, action: PayloadAction<boolean>) {
            state.isProcessing = action.payload;
        },

        login(state: IUserState, action: PayloadAction<IUserAuthResponse>) {
            const { user, tokens } = action.payload;
            state.user = user;
            state.tokens = tokens;
            state.isProcessing = false;
            state.isAuth = true;
            state.error = "";
        },

        setError(state: IUserState, action: PayloadAction<string>) {
            state.error = action.payload;
        },

        updateUser(state: IUserState, action: PayloadAction<IUserResponse>) {
            state.isProcessing = false;
            state.user = action.payload;
        },

        getUser(state: IUserState, action: PayloadAction<IUserResponse>) {
            state.user = action.payload;
            state.isProcessing = false;
            state.error = "";
        },

        fetchError(state: IUserState, action: PayloadAction<string>) {
            state.isProcessing = false;
            state.error = action.payload;
        },

        logout(state: IUserState) {
            state.error = "";
            state.isAuth = false;
            state.isProcessing = false;
            state.user = {} as IUserResponse;
            state.tokens = {} as ITokens;
        },

        refreshTokens(
            state: IUserState,
            action: PayloadAction<IUserAuthResponse>
        ) {
            const { user, tokens } = action.payload;
            state.user = user;
            state.tokens = tokens;
            state.isProcessing = false;
            state.isAuth = true;
            state.error = "";
        },

        authError(state: IUserState, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isAuth = false;
            state.isProcessing = false;
            state.tokens = {} as ITokens;
            state.user = {} as IUserResponse;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserAuth.pending, (state) => {
            state.isProcessing = true;
        });

        builder.addCase(
            getUserAuth.fulfilled,
            (state, action: PayloadAction<IUserAuthResponse>) => {
                const { user, tokens } = action.payload;
                state.user = user;
                state.tokens = tokens;
                state.isProcessing = false;
                state.isAuth = true;
                state.error = "";
            }
        );

        builder.addCase(getUserAuth.rejected, (state) => {
            state.isAuth = false;
            state.isProcessing = false;
            state.tokens = {} as ITokens;
            state.user = {} as IUserResponse;
        });
    },
});
export { userAuthSlice };
