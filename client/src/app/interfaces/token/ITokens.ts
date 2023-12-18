import { IUserResponse } from "../user/IUserResponse";

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshTokensResponse {
    user: IUserResponse;
    tokens: ITokens;
}
