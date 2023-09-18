import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("tokens")
export class Token extends BaseEntity {
    @Column({ name: "refreshToken", type: "varchar", nullable: false })
    refreshToken: string;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;
}
