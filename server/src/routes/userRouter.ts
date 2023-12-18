import Router from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/authMiddleware";
import multer from "multer";

const upload = multer().single("avatar");
const userRouter = Router();
const userController = new UserController();

userRouter.get("/users/profile", auth, userController.getUserProfile);
userRouter.get("/users/:id", auth, userController.getUserById);
userRouter.post("/users/update", auth, upload, userController.updateUser);

export default userRouter;
