import { DataSource } from "typeorm";
import { database, host, port, username, password } from "./constants";
import { User } from "../entities/User";
import { Token } from "../entities/Token";

export const dataSource = new DataSource({
    type: "postgres",
    database,
    host,
    port,
    username,
    password,
    entities: [User, Token],
});
