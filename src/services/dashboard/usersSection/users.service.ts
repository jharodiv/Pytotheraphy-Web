import type { UsersModel } from "@model/dashboard/users.model";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type {
    CreateUserPayload,
    CreateUserResponse,
    UpdateUserPayload,
    UserResponse,
    UsersResponse,
} from "@type/dashboard/user.types";

/**
 * Get all users with the USER role.
 */

export async function getUsers(): Promise<UsersModel[]> {
    try {
        const response = await apiRequest<UsersResponse>(
            API_ROUTES.USERS.GET_USERS,
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to fetch users",
            error
        );

        throw new Error(
            "Unable to load users"
        );
    }
}

/**
 * Get a user by ID.
 */

export async function getUserById(
    id: string
): Promise<UsersModel> {
    try {
        const response = await apiRequest<UserResponse>(
            API_ROUTES.USERS.GET_USER_BY_ID(id),
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Failed to fetch user with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to load user"
        );
    }
}

/**
 * Create a new user.
 */

export async function createUser(
    user: CreateUserPayload
): Promise<UsersModel> {
    try {
        const response = await apiRequest<CreateUserResponse>(
            API_ROUTES.USERS.CREATE_USER,
            {
                method: "POST",
                body: JSON.stringify(user),
            }
        );

        return response.data.user;
    } catch (error) {
        console.error("Failed to create user", error);

        throw error instanceof Error
            ? error
            : new Error("Unable to create user");
    }
}

/**
 * Update an existing user.
 */

export async function updateUser(
    id: string,
    user: UpdateUserPayload
): Promise<UsersModel> {
    try {
        const response = await apiRequest<UserResponse>(
            API_ROUTES.USERS.UPDATE_USER(id),
            {
                method: "PUT",
                body: JSON.stringify(user),
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Failed to update user with ID ${id}:`,
            error
        );

        throw error instanceof Error
            ? error
            : new Error("Unable to update user.");
    }
}

/**
 * Delete an existing user.
 */

export async function deleteUser(
    id: string
): Promise<UsersModel> {
    try {
        const response = await apiRequest<UserResponse>(
            API_ROUTES.USERS.DELETE_USER(id),
            {
                method: "DELETE",
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Failed to delete user with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to delete user"
        );
    }
}
