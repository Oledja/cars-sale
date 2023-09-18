import Router from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
