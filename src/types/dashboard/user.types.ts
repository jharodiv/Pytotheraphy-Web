import type { UserRole, UsersModel } from "@model/dashboard/users.model";

// Request Payloads

export type CreateUserPayload = {
    email: string;
    password: string;
    fullName: string;
    username: string;
    role?: UserRole;
    photoUrl?: string;
}

export type UpdateUserPayload = {
    fullName?: string;
    username?: string;
    photoUrl?: string;
    role?: UserRole;
}

// API Responses

export interface UsersResponse {
    data: UsersModel[],
    message: string
}

export interface UserResponse {
    data: UsersModel,
    message: string
}

export interface CreateUserResponse {
    data: {
        message: string,
        user: UsersModel
    },
    message: string
}

// User Form

export type UserFormMode = "create" | "edit";

export type UserForm = {
    email: string;
    password: string;
    fullName: string;
    username: string;
    role: UserRole;
    photoUrl: string;
}

// useUsers Return Type

export interface UseUsersReturn {
    // Users
    users: UsersModel[];
    filteredUsers: UsersModel[];

    // Search
    search: string;
    setSearch: (value: string) => void;

    // Loading / Error
    loading: boolean;
    error: string | null;
    formError: string | null;

    // Services
    fetchUsers: () => Promise<void>;

    // Row UI
    activeUser: string | null;
    setActiveUser: (id: string | null) => void;

    // Form modal
    form: UserForm;
    formMode: UserFormMode;
    formOpen: boolean;
    saving: boolean;

    openCreateModal: () => void;
    openEditModal: (user: UsersModel) => void;
    closeFormModal: () => void;

    updateFormField: <K extends keyof UserForm>(
        field: K,
        value: UserForm[K]
    ) => void;

    submitForm: () => Promise<void>;

    // Delete
    handleRemoveUserClick: (user: UsersModel) => void;
}

// User Form Modal Props

export interface UserFormModalProps {
    mode: UserFormMode;
    user: UserForm;
    saving: boolean;
    error: string | null;

    onClose: () => void;

    onChange: <K extends keyof UserForm>(
        field: K,
        value: UserForm[K]
    ) => void;

    onSave: () => void;
}
