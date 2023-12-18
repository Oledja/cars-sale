export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    city: string;
    avatar: File | null;
}
