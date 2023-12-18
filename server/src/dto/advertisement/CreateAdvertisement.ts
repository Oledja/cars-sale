import { User } from "../../entities/User";

export type CreateAdvertisement = {
    make: string;

    model: string;

    year: number;

    engine: string;

    color: string;

    mileage: number;

    transmission: string;

    fuelType: string;

    description: string;

    user: User;
};
