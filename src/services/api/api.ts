import { API_URL } from "@config/api";


export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        credentials: "include",

        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("API Error:", data);
        console.log("Validation errors:", data.errors);
        
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data
}