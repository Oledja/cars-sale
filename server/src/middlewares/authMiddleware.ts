import { Request, Response, NextFunction } from "express";
import { TokenService } from "../sevices/TokenService";
import { PayloadUser } from "../dto/user/PayloadUser";

export interface CustomRequest extends Request {
    user: string | PayloadUser;
}

const tokenService = new TokenService();
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error();
        }
        const decodedToken = tokenService.validateAccessToken(token);
        if (!decodedToken) {
            throw new Error();
        }

        (req as CustomRequest).user = decodedToken;
        next();
    } catch (err) {
        res.status(401).send({ message: "Please authenticate" });
    }
};
