import { CreateUser, UpdateUser } from "../dto";
import { ResponseUser } from "../dto/user/ResponseUser";
import { User } from "../entities/User";
import { ApiError } from "../exceptions/ApiError";
import { UserRepository } from "../repositories/UserRepository";
import { AvatarService } from "./AvatarService";
import bcrypt from "bcrypt";

export class UserService {
    private userRepository = new UserRepository();
    private avatarService = new AvatarService();

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

    activateUser = async (activationLink: string) => {
        try {
            const user = await this.userRepository.getUserByActivationLink(
                activationLink
            );
            if (!user) {
                throw new Error("User from activation doen't exists");
            }
            user.isActivated = true;
            await this.userRepository.updateUser(user.id, user);
        } catch (error) {
            throw error;
        }
    };

    updateUser = async (
        id: string,
        update: UpdateUser,
        avatar: Express.Multer.File | undefined
    ): Promise<ResponseUser> => {
        try {
            const user = await this.userRepository.getUserById(id);
            if (update.avatarPath) {
                this.avatarService.deleteAvatar(user.avatarPath);
                user.avatarPath = "";
            }
            if (avatar) {
                const newAvatarPath = this.avatarService.saveAvatar(avatar);
                user.avatarPath = newAvatarPath;
            }
            await this.prepareUserToUpdate(user, update);
            await this.userRepository.updateUser(id, user);
            const updatedUser = await this.userRepository.getUserById(id);
            return new ResponseUser(updatedUser);
        } catch (error) {
            throw error;
        }
    };

    private prepareUserToUpdate = async (user: User, update: UpdateUser) => {
        if (update.firstname && user.firstname !== update.firstname) {
            user.firstname = update.firstname;
        }
        if (update.lastname && user.lastname !== update.lastname) {
            user.lastname = update.lastname;
        }
        if (update.newPassword) {
            const isPasswordEquals = await bcrypt.compare(
                update.currentPassword,
                user.password
            );
            if (!isPasswordEquals) {
                throw ApiError.BadRequest("Current password is not correct");
            }
            user.password = await bcrypt.hash(update.newPassword, 3);
        }
        if (update.phone && user.phone !== update.phone) {
            user.phone = update.phone;
        }
        if (update.city && user.city !== update.city) {
            user.city = update.city;
        }
    };
}
