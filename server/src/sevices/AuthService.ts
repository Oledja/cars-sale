import bcrypt from "bcrypt";
import { CreateUser } from "../dto";
import { LoginUser } from "../dto/user/LoginUser";
import { AuthResponse, ResponseUser } from "../dto/user/ResponseUser";
import { TokenService } from "./TokenService";
import { ApiError } from "../exceptions/ApiError";
import { GoogleService } from "./GoogleService";
import { UserService } from "./UserService";
import { FacebookService } from "./FacebookService";

export class AuthService {
    private tokenService = new TokenService();
    private googleAuthService = new GoogleService();
    private userService = new UserService();
    private facebookService = new FacebookService();

    register = async (create: CreateUser): Promise<AuthResponse> => {
        try {
            const { password, email } = create;
            const candidate = await this.userService.getUserByEmail(email);

            if (candidate) {
                throw ApiError.BadRequest(
                    `User with email: ${email} already exists`
                );
            }

            create.password = await bcrypt.hash(password, 3);
            const user = await this.userService.createUser(create);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    login = async (login: LoginUser): Promise<AuthResponse> => {
        try {
            const { email, password } = login;
            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                throw ApiError.BadRequest("User is not found");
            }

            const isPasswordEquals = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordEquals) {
                throw ApiError.BadRequest("Wrong password");
            }

            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    googleSignIn = async (code: string): Promise<AuthResponse> => {
        try {
            const email = await this.googleAuthService.getEmailByCode(code);
            const user = await this.userService.getUserByEmail(email);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    getGoogleAuthUrl = (): string => {
        try {
            return this.googleAuthService.getAuthorizeUrl();
        } catch (error) {
            throw error;
        }
    };

    getFacebookAuthUrl = (): string => {
        try {
            return this.facebookService.getAuthorizeUrl();
        } catch (error) {
            throw error;
        }
    };

    facebookSignIn = async (code: string): Promise<AuthResponse> => {
        try {
            const email = await this.facebookService.getEmailByCode(code);
            const user = await this.userService.getUserByEmail(email);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    refresh = async (refreshToken: string) => {
        try {
            const payload =
                this.tokenService.validateRefreshToken(refreshToken);
            const tokenFromDB = await this.tokenService.findToken(refreshToken);

            if (!payload || !tokenFromDB) {
                throw ApiError.UnauthorizedError();
            }

            const user = await this.userService.getUserById(payload.id);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            console.log(error);

            throw error;
        }
    };
}
