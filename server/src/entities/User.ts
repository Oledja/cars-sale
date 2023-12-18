import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {
    @Column({ name: "firstname", type: "varchar" })
    firstname: string;

    @Column({ name: "lastname", type: "varchar" })
    lastname: string;

    @Column({ name: "email", type: "varchar", unique: true })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @Column({ name: "phone", type: "varchar" })
    phone: string;

    @Column({ name: "city", type: "varchar" })
    city: string;

    @Column({ name: "avatarPath", type: "varchar", nullable: true })
    avatarPath: string;

    @Column({ name: "isActivated", type: "boolean", default: "false" })
    isActivated: boolean;

    @Column({ name: "activationLink", type: "varchar" })
    activationLink: string;
}
