import { ITokens } from "../token/ITokens";
import { IUserAuthResponse } from "./IUserAuthResponse";
import { IUserResponse } from "./IUserResponse";

export interface IUserState {
    user: IUserResponse;
    tokens: ITokens;
    isAuth: boolean;
    isProcessing: boolean;
    error: string;
}
