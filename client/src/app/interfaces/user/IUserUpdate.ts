export interface IUserUpdate {
    firstname?: string;
    lastname?: string;
    email?: string;
    newPassword?: string;
    currentPassword: string;
    phone?: string;
    city?: string;
    avatarPath: string;
    avatar?: File;
}
