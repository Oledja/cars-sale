import { DataSource } from "typeorm";
import { database, host, port, username, password } from "./constants";
import { User } from "../entities/User";
import { Token } from "../entities/Token";
import Advertisement from "../entities/Advertisement";

export const dataSource = new DataSource({
    type: "postgres",
    database,
    host,
    port,
    username,
    password,
    entities: [User, Token, Advertisement],
});
