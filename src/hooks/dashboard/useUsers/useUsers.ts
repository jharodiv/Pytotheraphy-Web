import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "@service/dashboard/usersSection/users.service";

import type { UsersModel } from "@model/dashboard/users.model";

import type {
    UpdateUserPayload,
    UseUsersReturn,
    UserForm,
    UserFormMode,
} from "@type/dashboard/user.types";

import { useConfirmation } from "@hooks/globalized/useConfirmation";

const EMPTY_FORM: UserForm = {
    email: "",
    password: "",
    fullName: "",
    username: "",
    role: "USER",
    photoUrl: "",
};

export function useUsers(): UseUsersReturn {

    // Data State

    const [users, setUsers] = useState<UsersModel[]>([]);

    // Search State

    const [search, setSearch] = useState("");

    // Status State

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [formError, setFormError] =
        useState<string | null>(null);

    // UI State

    const [activeUser, setActiveUser] =
        useState<string | null>(null);

    const [form, setForm] =
        useState<UserForm>(EMPTY_FORM);

    const [formMode, setFormMode] =
        useState<UserFormMode>("create");

    const [formOpen, setFormOpen] =
        useState(false);

    // User being edited
    const [editingUserId, setEditingUserId] =
        useState<string | null>(null);

    const [saving, setSaving] =
        useState(false);

    const { openConfirmation } = useConfirmation();

    // Fetch Users

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUsers();

            setUsers(data);
        } catch (error) {
            console.error(
                "Failed to fetch users:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load users."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Filter Users

    const filteredUsers = useMemo(() => {
        const searchTerm = search
            .toLowerCase()
            .trim();

        if (!searchTerm) {
            return users;
        }

        return users.filter((user) =>
            user.fullName
                ?.toLowerCase()
                .includes(searchTerm) ||
            user.username
                ?.toLowerCase()
                .includes(searchTerm) ||
            user.email
                ?.toLowerCase()
                .includes(searchTerm)
        );
    }, [users, search]);

    // Open the Create modal

    const openCreateModal = useCallback(() => {
        setForm(EMPTY_FORM);
        setFormMode("create");
        setEditingUserId(null);
        setFormError(null);
        setFormOpen(true);
    }, []);

    // Open the Edit modal

    const openEditModal = useCallback(
        (user: UsersModel) => {
            setForm({
                email: user.email,
                password: "",
                fullName: user.fullName,
                username: user.username,
                role: user.role,
                photoUrl: user.photoUrl ?? "",
            });

            setFormMode("edit");
            setEditingUserId(user.id);
            setFormError(null);
            setFormOpen(true);
        },
        []
    );

    // Close the form modal

    const closeFormModal = useCallback(() => {
        if (saving) {
            return;
        }

        setFormOpen(false);
        setEditingUserId(null);
        setFormError(null);
    }, [saving]);

    // Update Form Field

    const updateFormField = useCallback(
        <K extends keyof UserForm>(
            field: K,
            value: UserForm[K]
        ) => {
            setForm((current) => ({
                ...current,
                [field]: value,
            }));
        },
        []
    );

    // Save Create / Edit

    const submitForm = useCallback(async () => {
        try {
            setSaving(true);
            setFormError(null);

            if (formMode === "create") {
                const newUser = await createUser({
                    email: form.email.trim(),
                    password: form.password,
                    fullName: form.fullName.trim(),
                    username: form.username.trim(),
                    role: form.role,
                    // Empty string lets the backend generate a default avatar
                    photoUrl: form.photoUrl.trim() || undefined,
                });

                // getUsers only returns USER accounts
                if (newUser.role === "USER") {
                    setUsers((current) => [
                        ...current,
                        newUser,
                    ]);
                }
            } else {
                if (!editingUserId) {
                    return;
                }

                const payload: UpdateUserPayload = {
                    fullName: form.fullName.trim(),
                    username: form.username.trim(),
                    photoUrl: form.photoUrl.trim(),
                    role: form.role,
                };

                const updatedUser = await updateUser(
                    editingUserId,
                    payload
                );

                // Remove users promoted to ADMIN, since the list only shows USER accounts
                setUsers((current) =>
                    updatedUser.role === "USER"
                        ? current.map((user) =>
                            user.id === updatedUser.id
                                ? updatedUser
                                : user
                        )
                        : current.filter(
                            (user) =>
                                user.id !== updatedUser.id
                        )
                );
            }

            setFormOpen(false);
            setEditingUserId(null);
        } catch (error) {
            console.error(
                "Failed to save user:",
                error
            );

            setFormError(
                error instanceof Error
                    ? error.message
                    : "Unable to save user."
            );
        } finally {
            setSaving(false);
        }
    }, [form, formMode, editingUserId]);

    // Delete User

    const removeUser = useCallback(
        async (id: string) => {
            try {
                setError(null);

                await deleteUser(id);

                setUsers((current) =>
                    current.filter(
                        (user) =>
                            user.id !== id
                    )
                );

                setActiveUser(null);
            } catch (error) {
                console.error(
                    "Failed to delete user:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to delete user."
                );
            }
        },
        []
    );

    const handleRemoveUserClick = useCallback(
        (user: UsersModel) => {
            openConfirmation({
                title: "Delete User?",
                description: `Are you sure you want to delete ${user.fullName}?`,
                confirmText: "Delete",
                cancelText: "Cancel",
                onConfirm: () => removeUser(user.id),
            });
        },
        [openConfirmation, removeUser]
    );

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        filteredUsers,

        search,
        setSearch,

        loading,
        error,
        formError,

        fetchUsers,

        // Row UI
        activeUser,
        setActiveUser,

        // Form modal
        form,
        formMode,
        formOpen,
        saving,

        openCreateModal,
        openEditModal,
        closeFormModal,

        updateFormField,
        submitForm,

        // Delete
        handleRemoveUserClick,
    };
}
