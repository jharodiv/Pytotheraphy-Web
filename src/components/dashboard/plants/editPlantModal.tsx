import { Check, X } from "lucide-react";

import type { PlantModel } from "@model/dashboard/plants.model";

import EditableInput from "@components/dashboard/plants/editableTextInput";
import EditableTextarea from "@components/dashboard/plants/editableTextArea";
import CategoryPicker from "@components/dashboard/plants/categoryPicker";

import type {
    EditPlantModalProps,
} from "@type/dashboard/plant.types";

export default function EditPlantModal({
    plant,
    categoryOptions,
    editingFields,
    changedFields,
    saving,
    onClose,
    onEditField,
    onSaveField,
    onClearField,
    onChangeField,
    onSave,
}: EditPlantModalProps) {
    const isEditing = (
        field: keyof PlantModel
    ) => editingFields.has(field);

    const isChanged = (
        field: keyof PlantModel
    ) => changedFields.has(field);

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
                {/* Header                                                     */}

                <div className="flex items-center justify-between border-b border-[#e8ebe5] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            Edit Plant
                        </h2>

                        <p className="mt-1 text-sm text-[#7b847a]">
                            Update plant information.
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

                {/* Content                                                    */}

                <div className="overflow-y-auto px-6 py-6">
                    <div className="space-y-6">

                        {/* Basic Information                                  */}

                        <div>
                            <h3 className="text-sm font-semibold text-[#486344]">
                                Basic Information
                            </h3>

                            <div className="mt-4 grid gap-5 sm:grid-cols-2">

                                {/* Common Name */}

                                <EditableInput
                                    label="Common Name"
                                    value={plant.commonName}
                                    editing={isEditing(
                                        "commonName"
                                    )}
                                    changed={isChanged(
                                        "commonName"
                                    )}
                                    onEdit={() =>
                                        onEditField(
                                            "commonName"
                                        )
                                    }
                                    onSave={() =>
                                        onSaveField(
                                            "commonName"
                                        )
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "commonName",
                                            value
                                        )
                                    }
                                    onClear={() =>
                                        onClearField(
                                            "commonName"
                                        )
                                    }
                                />

                                {/* Scientific Name */}

                                <EditableInput
                                    label="Scientific Name"
                                    value={
                                        plant.scientificName
                                    }
                                    editing={isEditing(
                                        "scientificName"
                                    )}
                                    changed={isChanged(
                                        "scientificName"
                                    )}
                                    onEdit={() =>
                                        onEditField(
                                            "scientificName"
                                        )
                                    }
                                    onSave={() =>
                                        onSaveField(
                                            "scientificName"
                                        )
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "scientificName",
                                            value
                                        )
                                    }
                                    onClear={() =>
                                        onClearField(
                                            "scientificName"
                                        )
                                    }
                                />

                                {/* Family */}

                                <EditableInput
                                    label="Family"
                                    value={plant.family}
                                    editing={isEditing(
                                        "family"
                                    )}
                                    changed={isChanged(
                                        "family"
                                    )}
                                    onEdit={() =>
                                        onEditField(
                                            "family"
                                        )
                                    }
                                    onSave={() =>
                                        onSaveField(
                                            "family"
                                        )
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "family",
                                            value
                                        )
                                    }
                                    onClear={() =>
                                        onClearField(
                                            "family"
                                        )
                                    }
                                />

                                {/* Origin */}

                                <EditableInput
                                    label="Origin"
                                    value={plant.origin}
                                    editing={isEditing(
                                        "origin"
                                    )}
                                    changed={isChanged(
                                        "origin"
                                    )}
                                    onEdit={() =>
                                        onEditField(
                                            "origin"
                                        )
                                    }
                                    onSave={() =>
                                        onSaveField(
                                            "origin"
                                        )
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "origin",
                                            value
                                        )
                                    }
                                    onClear={() =>
                                        onClearField(
                                            "origin"
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Description                                         */}

                        <EditableTextarea
                            label="Description"
                            value={plant.description}
                            editing={isEditing(
                                "description"
                            )}
                            changed={isChanged(
                                "description"
                            )}
                            onEdit={() =>
                                onEditField(
                                    "description"
                                )
                            }
                            onSave={() =>
                                onSaveField(
                                    "description"
                                )
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "description",
                                    value
                                )
                            }
                            onClear={() =>
                                onClearField(
                                    "description"
                                )
                            }
                        />

                        {/* Uses                                                */}

                        <EditableTextarea
                            label="Uses"
                            value={plant.uses}
                            editing={isEditing(
                                "uses"
                            )}
                            changed={isChanged(
                                "uses"
                            )}
                            onEdit={() =>
                                onEditField(
                                    "uses"
                                )
                            }
                            onSave={() =>
                                onSaveField(
                                    "uses"
                                )
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "uses",
                                    value
                                )
                            }
                            onClear={() =>
                                onClearField(
                                    "uses"
                                )
                            }
                        />
                        
                        {/* Categories                                          */}

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-xs font-medium text-[#596257]">
                                    Categories
                                </label>

                                {!isEditing(
                                    "categories"
                                ) &&
                                    !isChanged(
                                        "categories"
                                    ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEditField(
                                                    "categories"
                                                )
                                            }
                                            className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344]"
                                        >
                                            Edit
                                        </button>
                                    )}

                                {!isEditing(
                                    "categories"
                                ) &&
                                    isChanged(
                                        "categories"
                                    ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onClearField(
                                                    "categories"
                                                )
                                            }
                                            className="text-xs font-medium text-[#7b847a] hover:text-[#c65353]"
                                        >
                                            Clear
                                        </button>
                                    )}

                                {isEditing(
                                    "categories"
                                ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onSaveField(
                                                    "categories"
                                                )
                                            }
                                            className="rounded-md bg-[#486344] px-2.5 py-1 text-xs font-medium text-white"
                                        >
                                            Save
                                        </button>
                                    )}
                            </div>

                            <div className="rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3">
                                {isEditing(
                                    "categories"
                                ) ? (
                                    <CategoryPicker
                                        options={categoryOptions}
                                        selected={plant.categories}
                                        onChange={(categories) =>
                                            onChangeField(
                                                "categories",
                                                categories
                                            )
                                        }
                                    />
                                ) : plant.categories.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {plant.categories.map(
                                            (category) => (
                                                <span
                                                    key={category.id}
                                                    className="rounded-full bg-[#edf4eb] px-3 py-1 text-xs font-medium text-[#486344]"
                                                >
                                                    {category.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-xs text-[#7b847a]">
                                        No categories assigned.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Image URL                                           */}

                        <EditableInput
                            label="Image URL"
                            value={plant.imageUrl}
                            editing={isEditing(
                                "imageUrl"
                            )}
                            changed={isChanged(
                                "imageUrl"
                            )}
                            onEdit={() =>
                                onEditField(
                                    "imageUrl"
                                )
                            }
                            onSave={() =>
                                onSaveField(
                                    "imageUrl"
                                )
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "imageUrl",
                                    value
                                )
                            }
                            onClear={() =>
                                onClearField(
                                    "imageUrl"
                                )
                            }
                        />

                        {/* Verification                                        */}

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-xs font-medium text-[#596257]">
                                    Verification Status
                                </label>

                                {!isEditing(
                                    "verification"
                                ) &&
                                    !isChanged(
                                        "verification"
                                    ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEditField(
                                                    "verification"
                                                )
                                            }
                                            className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344]"
                                        >
                                            Edit
                                        </button>
                                    )}

                                {!isEditing(
                                    "verification"
                                ) &&
                                    isChanged(
                                        "verification"
                                    ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onClearField(
                                                    "verification"
                                                )
                                            }
                                            className="text-xs font-medium text-[#7b847a] hover:text-[#c65353]"
                                        >
                                            Clear
                                        </button>
                                    )}

                                {isEditing(
                                    "verification"
                                ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onSaveField(
                                                    "verification"
                                                )
                                            }
                                            className="rounded-md bg-[#486344] px-2.5 py-1 text-xs font-medium text-white"
                                        >
                                            Save
                                        </button>
                                    )}
                            </div>

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

                                {isEditing(
                                    "verification"
                                ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onChangeField(
                                                    "verification",
                                                    !plant.verification
                                                )
                                            }
                                            className="cursor-pointer rounded-lg bg-[#486344] px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            Change Status
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer                                                     */}

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
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}