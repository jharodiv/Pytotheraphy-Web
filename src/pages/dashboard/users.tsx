import {
    Pencil,
    Search,
    Trash2,
    Users as UsersIcon,
} from "lucide-react";

import UserFormModal from "@components/dashboard/users/userFormModal";

import { useUsers } from "@hooks/dashboard/useUsers/useUsers";

export default function Users() {
    const {
        filteredUsers,

        search,
        setSearch,

        loading,
        error,
        formError,

        activeUser,
        setActiveUser,

        form,
        formMode,
        formOpen,
        saving,

        openCreateModal,
        openEditModal,
        closeFormModal,

        updateFormField,
        submitForm,

        handleRemoveUserClick,
    } = useUsers();

    return (
        <div className="space-y-6">

            {/* Header                                                        */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#263126]">
                        Users
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        View and manage registered users.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="cursor-pointer rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]"
                >
                    Add User
                </button>
            </div>

            {/* Users Card                                                    */}

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">

                {/* Search */}

                <div className="border-b border-[#e8ebe5] p-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search users..."
                            className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                        />
                    </div>
                </div>

                {/* Loading                                                       */}

                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <p className="text-sm text-[#7b847a]">
                            Loading users...
                        </p>
                    </div>
                )}

                {/* Error                                                         */}

                {!loading && error && (
                    <div className="flex min-h-64 items-center justify-center text-center">
                        <div>
                            <p className="text-sm font-medium text-red-600">
                                Failed to load users
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty                                                         */}

                {!loading &&
                    !error &&
                    filteredUsers.length === 0 && (
                        <div className="flex min-h-64 flex-col items-center justify-center text-center">
                            <UsersIcon className="h-10 w-10 text-[#b3c0ae]" />

                            <p className="mt-3 text-sm font-medium text-[#596257]">
                                No users to display
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {search
                                    ? "Try adjusting your search."
                                    : "Registered users will appear here."}
                            </p>
                        </div>
                    )}

                {/* User List                                                     */}

                {!loading &&
                    !error &&
                    filteredUsers.length > 0 && (
                        <div className="divide-y divide-[#e8ebe5]">
                            {filteredUsers.map(
                                (user) => {
                                    const isActive =
                                        activeUser ===
                                        user.id;

                                    return (
                                        <div
                                            key={user.id}
                                            className="relative overflow-hidden"
                                        >
                                            {/* Actions */}

                                            <div className="absolute inset-y-0 right-0 flex w-40">

                                                <button
                                                    type="button"
                                                    onClick={(
                                                        event
                                                    ) => {
                                                        event.stopPropagation();

                                                        openEditModal(
                                                            user
                                                        );
                                                    }}
                                                    className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#486344] text-white transition hover:bg-[#3d5739]"
                                                >
                                                    <Pencil className="h-4 w-4" />

                                                    <span className="text-xs font-medium">
                                                        Edit
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={(
                                                        event
                                                    ) => {
                                                        event.stopPropagation();

                                                        handleRemoveUserClick(user);
                                                    }}
                                                    className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#c65353] text-white transition hover:bg-[#b74747]"
                                                >
                                                    <Trash2 className="h-4 w-4" />

                                                    <span className="text-xs font-medium">
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>

                                            {/* User Row */}

                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() =>
                                                    setActiveUser(
                                                        isActive
                                                            ? null
                                                            : user.id
                                                    )
                                                }
                                                onKeyDown={(
                                                    event
                                                ) => {
                                                    if (
                                                        event.key ===
                                                        "Enter" ||
                                                        event.key ===
                                                        " "
                                                    ) {
                                                        setActiveUser(
                                                            isActive
                                                                ? null
                                                                : user.id
                                                        );
                                                    }
                                                }}
                                                className={`relative flex cursor-pointer items-center gap-3 bg-white p-4 transition-transform duration-300 ease-in-out hover:bg-[#fafbf9] ${isActive
                                                    ? "-translate-x-40"
                                                    : "translate-x-0"
                                                    }`}
                                            >
                                                <img
                                                    src={user.photoUrl}
                                                    alt={user.fullName}
                                                    className="h-10 w-10 shrink-0 rounded-full bg-[#edf2ea] object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-[#263126]">
                                                        {user.fullName}
                                                    </p>

                                                    <p className="mt-1 truncate text-xs text-[#7b847a]">
                                                        @{user.username} · {user.email}
                                                    </p>
                                                </div>

                                                <span className="hidden shrink-0 text-xs text-[#929a91] sm:block">
                                                    Joined{" "}
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
            </div>

            {/* Create / Edit Modal                                            */}

            {formOpen && (
                <UserFormModal
                    mode={formMode}
                    user={form}
                    saving={saving}
                    error={formError}
                    onClose={closeFormModal}
                    onChange={updateFormField}
                    onSave={submitForm}
                />
            )}
        </div>
    );
}
