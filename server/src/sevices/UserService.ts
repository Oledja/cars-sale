import { CreateUser } from "../dto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    private userRepository = new UserRepository();

    getUserById = async (userId: User["id"]): Promise<User> => {
        try {
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw new Error(`User with id: ${userId} doesn't exists`);
            }
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw error;
        }
    };

    getUserByEmail = async (email: User["email"]) => {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error(`User with email: ${email} doesn't exists`);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    createUser = async (user: CreateUser) => {
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };
}
