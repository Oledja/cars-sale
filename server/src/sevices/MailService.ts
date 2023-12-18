import nodemailer from "nodemailer";
import { getConfirmLetter } from "../utils/confirmLetter";

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

export class MailService {
    private mailer;

    constructor() {
        this.mailer = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
        });
    }

    sendActivationMail = async (to: string, link: string) => {
        const letter = getConfirmLetter(link);
        try {
            await this.mailer.sendMail({
                from: user,
                to,
                subject: "Account activation on CARS_SALE",
                html: letter,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
