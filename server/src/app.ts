import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter";
import { dataSource } from "./db/connection";
import authRouter from "./routes/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const port = process.env.APP_PORT || 5000;
const app = express();

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(
    cors({
        origin: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        preflightContinue: false,
        credentials: true,
        optionsSuccessStatus: 204,
    })
);
app.set("trust proxy", true);

app.use(
    "/images",
    express.static("C:/Users/12345/Desktop/cars-sale/server/src/images/")
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(userRouter, authRouter);
app.use(errorHandler);

app.listen(port, async () => {
    await dataSource.initialize();
    await dataSource.synchronize(true);
    console.log(`Server started on port ${port}`);
});
