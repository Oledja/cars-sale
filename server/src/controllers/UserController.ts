import { NextFunction, Request, Response } from "express";
import { UserService } from "../sevices/UserService";

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
}
