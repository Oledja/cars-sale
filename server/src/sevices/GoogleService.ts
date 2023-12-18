import { OAuth2Client } from "google-auth-library";
import { ApiError } from "../exceptions/ApiError";

const clientId = process.env.GOOGLE_CLIENT_ID;
const secret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

export class GoogleService {
    private oAuth2Client = new OAuth2Client(clientId, secret, redirectUrl);

    getEmailByCode = async (code: string): Promise<string> => {
        try {
            const {
                tokens: { id_token: token },
            } = await this.oAuth2Client.getToken(code);

            if (!token) {
                throw ApiError.UnauthorizedError();
            }

            const info = await this.oAuth2Client.verifyIdToken({
                idToken: token,
            });
            const payload = info.getPayload();

            if (!payload) {
                throw ApiError.UnauthorizedError();
            }

            const { email } = payload;

            if (!email) {
                throw ApiError.UnauthorizedError();
            }

            return email;
        } catch (error) {
            throw error;
        }
    };
}
