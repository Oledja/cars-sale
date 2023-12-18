import axios from "axios";
import {} from "query-string";
import { ApiError } from "../exceptions/ApiError";

const clientId = process.env.FACEBOOK_CLIENT_ID;
const secret = process.env.FACEBOOK_CLIENT_SECRET;
const redirectUrl = process.env.FACEBOOK_REDIRECT_URL;

export class FacebookService {
    getEmailByCode = async (code: string): Promise<string> => {
        try {
            const {
                data: { access_token: token },
            } = await axios({
                url: "https://graph.facebook.com/v18.0/oauth/access_token",
                method: "get",
                params: {
                    client_id: clientId,
                    client_secret: secret,
                    redirect_uri: redirectUrl,
                    code,
                },
            });

            const {
                data: { email },
            } = await axios({
                url: `https://graph.facebook.com/me`,
                method: "get",
                params: {
                    fields: "email",
                    access_token: token,
                },
            });

            if (!email) {
                throw ApiError.UnauthorizedError();
            }

            return email;
        } catch (error) {
            throw error;
        }
    };
}
