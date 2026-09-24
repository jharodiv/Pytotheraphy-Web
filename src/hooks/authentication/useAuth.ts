import { useState } from "react";

import { login as loginService } from "@service/authentication/auth.service";

import { validateLogin } from "@validation/authentication/auth.validation";

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


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
        setEmailError("");
        setPasswordError("");
        setError(null);

        const loginData: LoginRequest = {
            email: email.trim(),
            password
        };

        const validation = validateLogin(loginData);


        if (Object.keys(validation).length > 0) {
            setEmailError(validation.email ?? "");
            setPasswordError(validation.password ?? "");

            return
        }

        try {
            setLoading(true);

            const response = await loginService(loginData);

            setUser(response.user);

            return response;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login Failed";

            setError(message);

            return undefined;
        } finally {
            setLoading(false);
        }
    }
    return {
        user,
        login,
        error,
        loading,
    }
};