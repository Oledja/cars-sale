import { CreateUser } from "../dto";
import { LoginUser } from "../dto/user/LoginUser";
import { UserRepository } from "../repositories/UserRepository";
import { AuthResponse, ResponseUser } from "../dto/user/ResponseUser";
import { TokenService } from "./TokenService";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/ApiError";

export class AuthService {
    private userRepository = new UserRepository();
    private tokenService = new TokenService();

    register = async (create: CreateUser): Promise<AuthResponse> => {
        try {
            const { password, email } = create;
            const candidate = await this.userRepository.getUserByEmail(email);

            if (candidate) {
                throw ApiError.BadRequest(
                    `User with email: ${email} already exists`
                );
            }

            create.password = await bcrypt.hash(password, 3);
            const user = await this.userRepository.createUser(create);
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
            const user = await this.userRepository.getUserByEmail(email);

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

    refresh = async (refreshToken: string) => {
        try {
            const payload =
                this.tokenService.validateRefreshToken(refreshToken);
            const tokenFromDB = await this.tokenService.findToken(refreshToken);

            if (!payload || !tokenFromDB) {
                throw ApiError.UnauthorizedError();
            }

            const user = await this.userRepository.getUserById(payload.id);
            const userDto = new ResponseUser(user);
            const tokens = await this.tokenService.generateTokens({
                ...userDto,
            });
            console.log("HERE");

            await this.tokenService.saveToken(user, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            console.log(error);

            throw error;
        }
    };
}
