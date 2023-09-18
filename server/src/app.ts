import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter";
import { dataSource } from "./db/connection";
import "reflect-metadata";
import authRouter from "./routes/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.APP_PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(userRouter, authRouter);
app.use(errorHandler);

app.listen(port, async () => {
    await dataSource.initialize();
    await dataSource.synchronize(true);
    console.log(`Server started on port ${port}`);
});
