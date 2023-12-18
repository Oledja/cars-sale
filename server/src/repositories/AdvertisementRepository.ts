import { dataSource } from "../db/connection";
import { CreateAdvertisement } from "../dto/advertisement/CreateAdvertisement";
import { UpdateAdvertisement } from "../dto/advertisement/UpdateAdvertisement";
import Advertisement from "../entities/Advertisement";
import { User } from "../entities/User";

export class AdvertisementRepository {
    private db = dataSource.getRepository(Advertisement);

    getAdvertisementById = async (
        id: Advertisement["id"]
    ): Promise<Advertisement | null> => {
        const [result] = await this.db.findBy({ id });
        return result;
    };

    getAdvertisementsByUserId = async (
        userId: User["id"]
    ): Promise<Advertisement[]> => {
        return await this.db.findBy({ user: { id: userId } });
    };

    getAdvertisements = async (): Promise<Advertisement[]> => {
        return await this.db.find();
    };

    // getAdvertisementsByFilter = async (filter: )

    createAdvertisement = async (
        create: CreateAdvertisement
    ): Promise<Advertisement> => {
        return await this.db.save(create);
    };

    updateAdvertisement = async (
        id: Advertisement["id"],
        update: UpdateAdvertisement
    ) => {
        await this.db.update({ id }, update);
    };

    deleteAdvertisement = async (id: Advertisement["id"]) => {
        await this.db.delete(id);
    };
}
