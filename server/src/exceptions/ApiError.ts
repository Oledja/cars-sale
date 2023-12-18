export class ApiError extends Error {
    status: number;

    constructor(stauts: number, message: string) {
        super(message);
        this.status = stauts;
    }

    static UnauthorizedError = () => {
        return new ApiError(401, "Unauthorized");
    };

    static BadRequest = (message: string) => {
        return new ApiError(400, message);
    };

    static Conflict = (message: string) => {
        return new ApiError(409, message);
    };
}
