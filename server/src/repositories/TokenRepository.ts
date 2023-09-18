import { dataSource } from "../db/connection";
import { Token } from "../entities/Token";
import { User } from "../entities/User";

export class TokenRepository {
    private db = dataSource.getRepository(Token);

    getTokenByUserId = async (userId: User["id"]): Promise<Token> => {
        const [token] = await this.db.findBy({ user: { id: userId } });
        console.log(token);

        return token;
    };

    getToken = async (refreshToken: string): Promise<Token | null> => {
        return await this.db.findOneBy({ refreshToken });
    };

    saveToken = async (token: Token): Promise<Token> => {
        return await this.db.save(token);
    };

    createToken = async (user: User, refreshToken: string): Promise<Token> => {
        const token = this.db.create({ user, refreshToken });
        return await this.saveToken(token);
    };
}
