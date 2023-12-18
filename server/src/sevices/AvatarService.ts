import { v4 as uuidv4 } from "uuid";
import { appendFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import path from "path";

export class AvatarService {
    saveAvatar = (file: Express.Multer.File): string => {
        try {
            const { originalname } = file;
            const uniqValue = uuidv4();
            const type = originalname.split(".")[1];
            const name = uniqValue + "." + type;
            if (
                !existsSync(
                    "C:/Users/12345/Desktop/cars-sale/server/src/images/"
                )
            ) {
                mkdirSync(
                    "C:/Users/12345/Desktop/cars-sale/server/src/images/"
                );
            }
            appendFileSync(
                path.join(
                    "C:/Users/12345/Desktop/cars-sale/server/src/images/",
                    name
                ),
                file.buffer
            );

            return name;
        } catch (error) {
            throw error;
        }
    };

    deleteAvatar = (filename: string): void => {
        try {
            if (
                !existsSync(
                    "C:/Users/12345/Desktop/cars-sale/server/src/images/"
                )
            ) {
                unlinkSync(
                    path.join(
                        "C:/Users/12345/Desktop/cars-sale/server/src/images/",
                        filename
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
}
