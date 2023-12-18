export type UpdateUser = {
    firstname: string;
    lastname: string;
    currentPassword: string;
    newPassword: string;
    phone: string;
    city: string;
    avatarPath?: string;
};
