import Router from "express";
import multer from "multer";
import { AuthController } from "../controllers/AuthController";

const upload = multer().single("avatar");
const authRouter = Router();
const authController = new AuthController();

authRouter.post(
    "/sessions/auth/registration",
    upload,
    authController.registration
);
authRouter.post("/sessions/auth/login", authController.login);
authRouter.get("/sessions/auth/refresh", authController.refreshTokens);
authRouter.get("/sessions/auth/activate/:link", authController.activate);
authRouter.get("/sessions/auth/google", authController.googleSignIn);
authRouter.get("/sessions/auth/facebook", authController.facebookSignIn);
authRouter.delete("/sessions/auth/logout", authController.logout);

export default authRouter;
