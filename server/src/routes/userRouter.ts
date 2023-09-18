import Router from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users/:id", userController.getUserById);

export default userRouter;
