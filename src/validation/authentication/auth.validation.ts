import type { LoginRequest, LoginValidationError } from "@type/authentication/auth.type";

export function validateLogin(
    data: LoginRequest
) {

    const errors: LoginValidationError = {};

    if (!data.email.trim()) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Please enter a valid email";
    };

    if (!data.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;

}