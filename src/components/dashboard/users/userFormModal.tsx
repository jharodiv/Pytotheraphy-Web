import { Check, X } from "lucide-react";

import type {
    UserFormModalProps,
} from "@type/dashboard/user.types";

const inputClassName =
    "w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344] disabled:cursor-not-allowed disabled:bg-[#f4f6f2] disabled:text-[#7b847a]";

export default function UserFormModal({
    mode,
    user,
    saving,
    error,
    onClose,
    onChange,
    onSave,
}: UserFormModalProps) {
    const isCreate = mode === "create";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#e8ebe5] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            {isCreate
                                ? "Create User"
                                : "Edit User"}
                        </h2>

                        <p className="mt-1 text-sm text-[#7b847a]">
                            {isCreate
                                ? "Register a new user account."
                                : "Update this user's information."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg p-2 text-[#7b847a] transition hover:bg-[#f4f6f2] hover:text-[#263126] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}

                <div className="overflow-y-auto px-6 py-6">
                    <div className="grid gap-5 sm:grid-cols-2">

                        {/* Full Name */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={user.fullName}
                                onChange={(event) =>
                                    onChange(
                                        "fullName",
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. Juan Dela Cruz"
                                className={inputClassName}
                            />
                        </div>

                        {/* Username */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Username
                            </label>

                            <input
                                type="text"
                                value={user.username}
                                onChange={(event) =>
                                    onChange(
                                        "username",
                                        event.target.value
                                    )
                                }
                                placeholder="At least 3 characters"
                                className={inputClassName}
                            />
                        </div>

                        {/* Email */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                onChange={(event) =>
                                    onChange(
                                        "email",
                                        event.target.value
                                    )
                                }
                                disabled={!isCreate}
                                placeholder="e.g. juan@email.com"
                                className={inputClassName}
                            />
                        </div>

                        {/* Password (create only) */}

                        {isCreate && (
                            <div>
                                <label className="mb-2 block text-xs font-medium text-[#596257]">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={user.password}
                                    onChange={(event) =>
                                        onChange(
                                            "password",
                                            event.target.value
                                        )
                                    }
                                    placeholder="At least 8 characters"
                                    className={inputClassName}
                                />
                            </div>
                        )}

                        {/* Photo URL */}

                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Photo URL
                            </label>

                            <input
                                type="text"
                                value={user.photoUrl}
                                onChange={(event) =>
                                    onChange(
                                        "photoUrl",
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    isCreate
                                        ? "Optional, a default avatar is used if empty"
                                        : "https://..."
                                }
                                className={inputClassName}
                            />
                        </div>

                        {/* Role */}

                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Role
                            </label>

                            <div className="flex items-center justify-between rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "ADMIN"
                                        ? "bg-[#edf4eb] text-[#486344]"
                                        : "bg-[#f3f3f0] text-[#7b847a]"
                                        }`}
                                >
                                    {user.role === "ADMIN"
                                        ? "Admin"
                                        : "User"}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onChange(
                                            "role",
                                            user.role === "ADMIN"
                                                ? "USER"
                                                : "ADMIN"
                                        )
                                    }
                                    className="cursor-pointer rounded-lg bg-[#486344] px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Change Role
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error */}

                    {error && (
                        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-3 border-t border-[#e8ebe5] bg-[#fafbf9] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#486344] px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? (
                            "Saving..."
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                {isCreate
                                    ? "Create User"
                                    : "Save Changes"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
