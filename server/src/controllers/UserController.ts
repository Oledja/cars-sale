import { NextFunction, Request, Response } from "express";
import { UserService } from "../sevices/UserService";
import { CustomRequest } from "../middlewares/authMiddleware";
import { PayloadUser } from "../dto/user/PayloadUser";
import { UpdateUser } from "../dto";

export class UserController {
    private userService = new UserService();

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    getUserProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { user: userPayload } = req as CustomRequest;
            const { id } = userPayload as PayloadUser;
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { user: userPayload } = req as CustomRequest;
            const { id } = userPayload as PayloadUser;
            const avatar = req.file as Express.Multer.File;
            const user = req.body as UpdateUser;
            const updatedUser = await this.userService.updateUser(
                id,
                user,
                avatar
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    };
}
