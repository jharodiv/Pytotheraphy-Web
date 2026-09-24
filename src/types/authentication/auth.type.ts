
export interface UseAuthReturn {
    user: User | null;
    error: string | null;
    loading: boolean;

    login: (data: LoginRequest) => Promise<LoginResponse>;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    email: string;
    fullName: string;
    userName: string;
    photoUrl: string | null;
    createdAt: string;
    lastLogin: string | null;
}

export type LoginResponse = {
    message: string;
    user: User;
}