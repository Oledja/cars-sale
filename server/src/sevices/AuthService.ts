import bcrypt from "bcrypt";
import { CreateUser } from "../dto";
import { LoginUser } from "../dto/user/LoginUser";
import { AuthResponse, ResponseUser } from "../dto/user/ResponseUser";
import { TokenService } from "./TokenService";
import { ApiError } from "../exceptions/ApiError";
import { GoogleService } from "./GoogleService";
import { UserService } from "./UserService";
import { FacebookService } from "./FacebookService";
import { MailService } from "./MailService";
import { v4 as uuidv4 } from "uuid";
import { AvatarService } from "./AvatarService";

const apiUrl = process.env.APP_URL;

export class AuthService {
    private tokenService = new TokenService();
    private googleAuthService = new GoogleService();
    private userService = new UserService();
    private facebookService = new FacebookService();
    private mailService = new MailService();
    private avatarService = new AvatarService();

    registration = async (
        create: CreateUser,
        avatar: Express.Multer.File | undefined
    ): Promise<AuthResponse> => {
        try {
            const { password, email } = create;
            const existUser = await this.userService.getUserByEmail(email);

            if (existUser) {
                throw ApiError.Conflict(
                    `User with email: ${email} already exists`
                );
            }

            if (avatar) {
                const avatarPath = this.avatarService.saveAvatar(avatar);
                create.avatarPath = avatarPath;
            }

            const link = uuidv4();
            create.password = await bcrypt.hash(password, 3);
            create.activationLink = link;

            const user = await this.userService.createUser(create);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });

            await this.tokenService.saveToken(user, tokens.refreshToken);
            await this.mailService.sendActivationMail(
                email,
                `${apiUrl}/sessions/auth/activate/${link}`
            );

            return { tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    login = async (login: LoginUser): Promise<AuthResponse> => {
        try {
            const { email, password } = login;
            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                throw ApiError.BadRequest("email or password is incorrect");
            }

            const isPasswordEquals = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordEquals) {
                throw ApiError.BadRequest("email or password is incorrect");
            }

            if (!user.isActivated) {
                throw ApiError.BadRequest(
                    "Please check your email and follow the link to confirm your registration."
                );
            }

            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    activate = async (activationLink: string) => {
        try {
            await this.userService.activateUser(activationLink);
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

            return { tokens, user: userDto };
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

            return { tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };

    refreshTokens = async (refreshToken: string) => {
        try {
            const payload =
                this.tokenService.validateRefreshToken(refreshToken);
            if (!payload) {
                throw ApiError.UnauthorizedError();
            }
            const { id: userId } = payload;
            const { refreshToken: tokenFromDB } =
                await this.tokenService.findTokenByUserId(userId);
            if (refreshToken !== tokenFromDB) {
                throw ApiError.UnauthorizedError();
            }

            const user = await this.userService.getUserById(userId);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { tokens, user: userDto };
        } catch (error) {
            throw error;
        }
    };
}
