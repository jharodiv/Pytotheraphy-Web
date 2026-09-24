import {
    signOut,
} from "firebase/auth";

import type { AuthError } from "firebase/auth";
import { type LoginResponse, type LoginRequest } from "@type/authentication/auth.type";

import { auth } from "@service/database/firebase";

import { getAuthErrorMessage } from "@errors/authentication/auth.error";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";

export async function login(
    data: LoginRequest
) {
    try {
        const response = await apiRequest<LoginResponse>(
            API_ROUTES.AUTH.ADMIN_LOGIN,
            {
                method: "POST",

                body: JSON.stringify(data),
            }
        );

        return response;
    } catch (err) {
        throw new Error(getAuthErrorMessage(err as AuthError));
    }
}


export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(getAuthErrorMessage(error as AuthError));
    }
}