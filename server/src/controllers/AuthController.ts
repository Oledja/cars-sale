import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../dto";
import { AuthService } from "../sevices/AuthService";
import { LoginUser } from "../dto/user/LoginUser";

const cookieMaxAge = process.env.COOKIE_MAX_AGE;

export class AuthController {
    private authService = new AuthService();
    registration = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const avatar = req.file as Express.Multer.File;
            const user = req.body as CreateUser;
            const response = await this.authService.registration(user, avatar);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const login = req.body as LoginUser;
            const response = await this.authService.login(login);
            const {
                tokens: { refreshToken },
            } = response;

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken: token } = req.cookies;

            const response = await this.authService.refreshTokens(token);
            const {
                tokens: { refreshToken },
            } = response;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { link } = req.params;
            await this.authService.activate(link);
            res.status(200);
            res.redirect("http://localhost:3000/auth/login");
        } catch (error) {
            next(error);
        }
    };

    googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.query.code as string;
            const response = await this.authService.googleSignIn(code);
            const {
                tokens: { refreshToken },
            } = response;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.redirect("http://localhost:3000");
        } catch (error) {
            next(error);
        }
    };

    facebookSignIn = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const code = req.query.code as string;
            const response = await this.authService.facebookSignIn(code);
            const {
                tokens: { refreshToken },
            } = response;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.redirect("http://localhost:3000");
        } catch (error) {
            next(error);
        }
    };

    logout = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("refreshToken", "", {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.status(200).end();
        } catch (error) {
            next(error);
        }
    };
}
