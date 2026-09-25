
export interface UseAuthReturn {
    user: User | null;
    error: string | null;
    loading: boolean;
    emailError: string | null;
    passwordError: string | null;
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleLogin: () => Promise<LoginResponse>;

    login: (data: LoginRequest) => Promise<LoginResponse>;
}

export interface LoginFormProps {
    email: string;
    password: string;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;

    emailError: string;
    passwordError: string;

    loading: boolean;
    error: string;

    handleLogin: () => Promise<LoginResponse>;
}

export interface LoginValidationError {
    email?: string;
    password?: string;
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