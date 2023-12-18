export const getFacebookAuthUrl = () => {
    const rootUrl = "https://www.facebook.com/v18.0/dialog/oauth";
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URL,
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        response_type: "code",
        scope: "email",
        authType: "rerequest",
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};
