import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Tokens } from "../interfaces/Tokens";
import { TokenRepository } from "../repositories/TokenRepository";
import { Token } from "../entities/Token";
import { ResponseUser } from "../dto/user/ResponseUser";
import { PayloadUser } from "../dto/user/PayloadUser";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export class TokenService {
    private tokenRepository = new TokenRepository();

    generateTokens = async (payload: PayloadUser): Promise<Tokens> => {
        try {
            const accessToken = jwt.sign(payload, accessSecret, {
                expiresIn: "30m",
            });

            const refreshToken = jwt.sign(payload, refreshSecret, {
                expiresIn: "30d",
            });

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    };

    saveToken = async (user: User, refreshToken: string): Promise<Token> => {
        try {
            const token = await this.tokenRepository.getTokenByUserId(user.id);
            if (token) {
                token.refreshToken = refreshToken;
                return await this.tokenRepository.saveToken(token);
            }
            return await this.tokenRepository.createToken(user, refreshToken);
        } catch (error) {
            throw error;
        }
    };

    findToken = async (refreshToken: string): Promise<Token | null> => {
        try {
            return await this.tokenRepository.getToken(refreshToken);
        } catch (error) {
            throw error;
        }
    };

    validateAccessToken = (token: string): PayloadUser | null => {
        try {
            const payload = jwt.verify(token, accessSecret) as PayloadUser;
            return payload;
        } catch (error) {
            return null;
        }
    };

    validateRefreshToken = (token: string): PayloadUser | null => {
        try {
            const payload = jwt.verify(token, refreshSecret) as PayloadUser;
            return payload;
        } catch (error) {
            return null;
        }
    };
}
