import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/ApiError";

export const errorHandler = (
    err: TypeError | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        const { status, message } = err;
        return res.status(status).json({ message });
    }

    return res.status(500).json({ message: "Unexpected error" });
};
