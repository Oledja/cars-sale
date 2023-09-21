import { CreateUser } from "../dto";
import { User } from "../entities/User";
import { ApiError } from "../exceptions/ApiError";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    private userRepository = new UserRepository();

    getUserById = async (userId: User["id"]): Promise<User> => {
        try {
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw ApiError.BadRequest(
                    `User with id: ${userId} doesn't exists`
                );
            }
            return user;
        } catch (error) {
            throw error;
        }
    };

    getUserByEmail = async (email: User["email"]) => {
        try {
            return await this.userRepository.getUserByEmail(email);
        } catch (error) {
            throw error;
        }
    };

    createUser = async (user: CreateUser) => {
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            throw error;
        }
    };
}
