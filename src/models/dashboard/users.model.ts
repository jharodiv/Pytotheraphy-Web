export type UserRole = "ADMIN" | "USER";

export type UsersModel = {
    id: string;

    email: string;
    fullName: string;
    username: string;
    role: UserRole;
    photoUrl: string;

    createdAt: string;
    updatedAt: string;
}
