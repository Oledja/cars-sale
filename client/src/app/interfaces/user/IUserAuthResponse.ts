import { ITokens } from "../token/ITokens";
import { IUserResponse } from "./IUserResponse";

export interface IUserAuthResponse {
    user: IUserResponse;
    tokens: ITokens;
}
