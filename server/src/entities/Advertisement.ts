import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("advertisements")
export default class Advertisement extends BaseEntity {
    @Column({ name: "make", type: "varchar", nullable: false })
    make: string;

    @Column({ name: "model", type: "varchar", nullable: false })
    model: string;

    @Column({ name: "year", type: "numeric", nullable: false })
    year: number;

    @Column({ name: "engine", type: "varchar", nullable: false })
    engine: string;

    @Column({ name: "color", type: "varchar", nullable: false })
    color: string;

    @Column({ name: "mileage", type: "numeric", nullable: false })
    mileage: number;

    @Column({ name: "transmission", type: "varchar", nullable: false })
    transmission: string;

    @Column({ name: "fuelType", type: "varchar", nullable: false })
    fuelType: string;

    @Column({ name: "description", type: "varchar", nullable: true })
    description: string;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;
}
