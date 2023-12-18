import { CreateAdvertisement } from "../dto/advertisement/CreateAdvertisement";
import { UpdateAdvertisement } from "../dto/advertisement/UpdateAdvertisement";
import Advertisement from "../entities/Advertisement";
import { User } from "../entities/User";
import { AdvertisementRepository } from "../repositories/AdvertisementRepository";
import { UserService } from "./UserService";

export class AdvertisementService {
    private advertisementRepository = new AdvertisementRepository();
    private userService = new UserService();

    getAdvertisementById = async (
        id: Advertisement["id"]
    ): Promise<Advertisement | null> => {
        try {
            return await this.advertisementRepository.getAdvertisementById(id);
        } catch (error) {
            throw error;
        }
    };

    getAdvertisementsByUserId = async (userId: User["id"]) => {
        try {
            return await this.advertisementRepository.getAdvertisementsByUserId(
                userId
            );
        } catch (error) {
            throw error;
        }
    };

    getAdvertisements = async (): Promise<Advertisement[]> => {
        try {
            return await this.advertisementRepository.getAdvertisements();
        } catch (error) {
            throw error;
        }
    };

    createAdvertisement = async (
        userId: User["id"],
        create: CreateAdvertisement
    ) => {
        try {
            const user = await this.userService.getUserById(userId);
            create.user = user;
            return await this.advertisementRepository.createAdvertisement(
                create
            );
        } catch (error) {
            throw error;
        }
    };

    updateAdvertisement = async (
        id: Advertisement["id"],
        update: UpdateAdvertisement
    ) => {
        try {
            await this.advertisementRepository.updateAdvertisement(id, update);
        } catch (error) {
            throw error;
        }
    };

    deleteAdvertisement = async (id: Advertisement["id"]) => {
        try {
            await this.advertisementRepository.deleteAdvertisement(id);
        } catch (error) {
            throw error;
        }
    };
}
