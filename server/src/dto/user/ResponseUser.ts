import { User } from "../../entities/User";
import { Tokens } from "../../interfaces/Tokens";

export class ResponseUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    city: string;
    avatarPath: string | null;

    constructor(user: User) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.phone = user.phone;
        this.city = user.city;
        this.avatarPath = user.avatarPath;
    }
}

export type AuthResponse = {
    user: ResponseUser;
    accessToken: string;
    refreshToken: string;
};
