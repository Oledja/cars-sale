import Router from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/google", authController.getGoogleAuthUrl);
authRouter.get("/google/callback", authController.googleSignIn);
authRouter.get("/facebook", authController.getFacebookAuthUrl);
authRouter.get("/facebook/callback", authController.facebookSignIn);

export default authRouter;
