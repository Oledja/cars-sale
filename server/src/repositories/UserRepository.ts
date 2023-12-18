import { dataSource } from "../db/connection";
import { User } from "../entities/User";
import { CreateUser, UpdateUser } from "../dto/index";

export class UserRepository {
    private db = dataSource.getRepository(User);

    getUserById = async (id: User["id"]) => {
        const [user] = await this.db.findBy({ id });
        return user;
    };

    getUserByEmail = async (email: User["email"]) => {
        const [user] = await this.db.findBy({ email });
        return user;
    };

    getUserByActivationLink = async (activationLink: string) => {
        const user = await this.db.findOne({ where: { activationLink } });
        return user;
    };

    createUser = async (user: CreateUser) => {
        return await this.db.save(user);
    };

    updateUser = async (id: User["id"], update: User) => {
        return await this.db.update(id, update);
    };
}
