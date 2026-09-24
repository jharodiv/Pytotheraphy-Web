import { useState } from "react";

import { login as loginService } from "@service/authentication/auth.service";

import type {
    LoginRequest,
    User,
    UseAuthReturn,
    LoginResponse
} from "@type/authentication/auth.type"

export function useAuth(): UseAuthReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const login = async (data: LoginRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginService(data);

            setUser(response.user);

            return response;


        } catch (err) {

            const message = err instanceof Error
                ? err.message
                : "Login failed";

            setError(message);

            throw err;

        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (): Promise<LoginResponse> => {
        try {
            setLoading(true);
            setError(null);
            

        }
    }

    return {
        user,
        login,
        error,
        loading
    }
};