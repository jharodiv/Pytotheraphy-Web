import { Check, X } from "lucide-react";

import CategoryPicker from "@components/dashboard/plants/categoryPicker";

import type {
    CreatePlantModalProps,
} from "@type/dashboard/plant.types";

export default function CreatePlantModal({
    plant,
    categoryOptions,
    saving,
    onClose,
    onChange,
    onSave,
}: CreatePlantModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#e8ebe5] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            Create Plant
                        </h2>

                        <p className="mt-1 text-sm text-[#7b847a]">
                            Add a new plant to the database.
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
                    <div className="space-y-6">

                        {/* Basic Information */}

                        <div>
                            <h3 className="text-sm font-semibold text-[#486344]">
                                Basic Information
                            </h3>

                            <div className="mt-4 grid gap-5 sm:grid-cols-2">

                                {/* Common Name */}

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-[#596257]">
                                        Common Name
                                    </label>

                                    <input
                                        type="text"
                                        value={plant.commonName}
                                        onChange={(event) =>
                                            onChange(
                                                "commonName",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Aloe Vera"
                                        className="w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                                    />
                                </div>

                                {/* Scientific Name */}

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-[#596257]">
                                        Scientific Name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            plant.scientificName
                                        }
                                        onChange={(event) =>
                                            onChange(
                                                "scientificName",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Aloe barbadensis"
                                        className="w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                                    />
                                </div>

                                {/* Family */}

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-[#596257]">
                                        Family
                                    </label>

                                    <input
                                        type="text"
                                        value={plant.family}
                                        onChange={(event) =>
                                            onChange(
                                                "family",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Asphodelaceae"
                                        className="w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                                    />
                                </div>

                                {/* Origin */}

                                <div>
                                    <label className="mb-2 block text-xs font-medium text-[#596257]">
                                        Origin
                                    </label>

                                    <input
                                        type="text"
                                        value={plant.origin}
                                        onChange={(event) =>
                                            onChange(
                                                "origin",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Arabian Peninsula"
                                        className="w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Description
                            </label>

                            <textarea
                                value={plant.description}
                                onChange={(event) =>
                                    onChange(
                                        "description",
                                        event.target.value
                                    )
                                }
                                placeholder="Describe the plant..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                            />
                        </div>

                        {/* Uses */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Uses
                            </label>

                            <textarea
                                value={plant.uses}
                                onChange={(event) =>
                                    onChange(
                                        "uses",
                                        event.target.value
                                    )
                                }
                                placeholder="Describe the plant's uses..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                            />
                        </div>

                        {/* Preparation Method */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Preparation Method
                            </label>

                            <textarea
                                value={
                                    plant.preparationMethod
                                }
                                onChange={(event) =>
                                    onChange(
                                        "preparationMethod",
                                        event.target.value
                                    )
                                }
                                placeholder="Describe how the plant is prepared..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                            />
                        </div>

                        {/* Side Effects */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Side Effects
                            </label>

                            <textarea
                                value={plant.sideEffect}
                                onChange={(event) =>
                                    onChange(
                                        "sideEffect",
                                        event.target.value
                                    )
                                }
                                placeholder="Describe possible side effects..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                            />
                        </div>

                        {/* Medicinal Properties */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Medicinal Properties
                            </label>

                            <p className="mt-1.5 text-xs text-[#7b847a]">
                                Separate properties with commas.
                            </p>
                        </div>

                        {/* Categories */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Categories
                            </label>

                            <CategoryPicker
                                options={categoryOptions}
                                selected={plant.categories}
                                disabled={saving}
                                onChange={(categories) =>
                                    onChange(
                                        "categories",
                                        categories
                                    )
                                }
                            />
                        </div>

                        {/* Image URL */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Image URL
                            </label>

                            <input
                                type="url"
                                value={plant.imageUrl}
                                onChange={(event) =>
                                    onChange(
                                        "imageUrl",
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                className="w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition focus:border-[#486344] focus:ring-1 focus:ring-[#486344]"
                            />
                        </div>

                        {/* Verification */}

                        <div>
                            <label className="mb-2 block text-xs font-medium text-[#596257]">
                                Verification Status
                            </label>

                            <div className="flex items-center justify-between rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${plant.verification
                                        ? "bg-[#edf4eb] text-[#486344]"
                                        : "bg-[#f3f3f0] text-[#7b847a]"
                                        }`}
                                >
                                    {plant.verification
                                        ? "Verified"
                                        : "Unverified"}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onChange(
                                            "verification",
                                            !plant.verification
                                        )
                                    }
                                    className="cursor-pointer rounded-lg bg-[#486344] px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Change Status
                                </button>
                            </div>
                        </div>
                    </div>
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
                            "Creating..."
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                Create Plant
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}