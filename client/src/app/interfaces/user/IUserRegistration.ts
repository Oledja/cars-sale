export interface IUserRegistration {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    avatar: File | null;
}
