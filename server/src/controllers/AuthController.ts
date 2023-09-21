import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../dto";
import { AuthService } from "../sevices/AuthService";
import { LoginUser } from "../dto/user/LoginUser";

const cookieMaxAge = process.env.COOKIE_MAX_AGE;

export class AuthController {
    private authService = new AuthService();
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body as CreateUser;
            const response = await this.authService.register(user);
            const { refreshToken } = response;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const login = req.body as LoginUser;
            const response = await this.authService.login(login);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken: token } = req.cookies;
            const response = await this.authService.refresh(token);
            const { refreshToken } = response;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: cookieMaxAge,
            });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    getGoogleAuthUrl = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const response = this.authService.getGoogleAuthUrl();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.query.code as string;
            const response = await this.authService.googleSignIn(code);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    getFacebookAuthUrl = (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = this.authService.getFacebookAuthUrl();
            res.status(200).json(response);
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
            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}
