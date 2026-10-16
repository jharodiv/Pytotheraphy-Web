import { X } from "lucide-react";
import { useState } from "react";
import type { CreateCategoryModalProps } from "@type/dashboard/categoties.type";

export default function CreateCategoryModal({
    isOpen,
    onClose,
    onCreate,
    isCreating,
}: CreateCategoryModalProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) {
        return null;
    }

    const resetForm = () => {
        setName("");
        setDescription("");
        setError(null);
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            return;
        }

        try {
            setError(null);

            await onCreate(name.trim(), description.trim());

            resetForm();
            onClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to create category");
        }
    };

    const handleClose = () => {
        if (isCreating) {
            return;
        }

        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e1e5de] px-5 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            Create Category
                        </h2>

                        <p className="mt-1 text-sm text-[#929a91]">
                            Add a new plant category.
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#929a91] transition hover:bg-[#f0f4ed] hover:text-[#486344]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>

                {/* Form */}
                <div className="space-y-4 p-5">

                    <div>
                        <label
                            htmlFor="category-name"
                            className="mb-2 block text-sm font-medium text-[#263126]"
                        >
                            Category Name
                        </label>

                        <input
                            id="category-name"
                            type="text"
                            value={name}
                            maxLength={50}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="e.g. Skin Care"
                            className="w-full rounded-lg border border-[#e1e5de] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category-description"
                            className="mb-2 block text-sm font-medium text-[#263126]"
                        >
                            Description{" "}
                            <span className="font-normal text-[#929a91]">
                                (optional)
                            </span>
                        </label>

                        <textarea
                            id="category-description"
                            value={description}
                            rows={3}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="What kind of plants belong here?"
                            className="w-full resize-none rounded-lg border border-[#e1e5de] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-[#e1e5de] px-5 py-4">

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isCreating}
                        className="rounded-lg border border-[#e1e5de] px-4 py-2.5 text-sm font-medium text-[#263126] transition hover:bg-[#f5f7f3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={
                            isCreating ||
                            !name.trim()
                        }
                        className="rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isCreating
                            ? "Creating..."
                            : "Create Category"}
                    </button>

                </div>

            </div>

        </div>
    );
}
