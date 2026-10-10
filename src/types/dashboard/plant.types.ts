import type {
    Dispatch,
    SetStateAction,
} from "react";

import type { PlantModel } from "@model/dashboard/plants.model";

// Plant Filter

export type PlantFilter =
    | "all"
    | "verified"
    | "unverified";

// usePlants Return Type

export interface UsePlantsReturn {
    // Plants
    plants: PlantModel[];
    filteredPlants: PlantModel[];

    // Search / Filter
    search: string;
    filter: PlantFilter;

    setSearch: Dispatch<
        SetStateAction<string>
    >;

    setFilter: Dispatch<
        SetStateAction<PlantFilter>
    >;

    // Loading / Error
    loading: boolean;
    error: string | null;

    // Services
    fetchPlants: () => Promise<void>;

    fetchPlantById: (
        id: string
    ) => Promise<PlantResponse | null>;

    createPlant: (
        plant: Omit<PlantModel, "id">
    ) => Promise<PlantModel>;

    handleRemovePlantClick: (
        plant: PlantModel
    ) => void;

    openCreateModal: () => void;
    closeCreateModal: () => void;
    updateCreateField: (
        field: keyof Omit<
            PlantModel,
            "id"
        >,
        value: string | boolean | string[]
    ) => void;
    createModalOpen: boolean;

    createForm: Omit<PlantModel, "id">;
    handleCreatePlant: () => Promise<void>;

    editPlant: (
        id: string,
        plant: Partial<
            Omit<PlantModel, "id">
        >
    ) => Promise<void>;

    removePlant: (
        id: string
    ) => Promise<void>;

    // Plant Row UI
    activePlant: string | null;
    setActivePlant: Dispatch<
        SetStateAction<string | null>
    >;

    // Edit Modal
    selectedPlant: PlantModel | null;
    editForm: PlantModel | null;
    editModalOpen: boolean;
    saving: boolean;
    openEditModal: (
        plant: PlantModel
    ) => void;
    closeEditModal: () => void;

    // Individual Field Editing

    editingFields: Set<keyof PlantModel>;

    changedFields: Set<keyof PlantModel>;
    enableFieldEdit: (
        field: keyof PlantModel
    ) => void;
    saveEditField: (
        field: keyof PlantModel
    ) => void;
    clearFieldEdit: (
        field: keyof PlantModel
    ) => void;
    updateEditField: <
        K extends keyof PlantModel
    >(
        field: K,
        value: PlantModel[K]
    ) => void;

    // Verification
    handleVerify: (
        id: string
    ) => Promise<void>;
    handleUnverify: (
        id: string
    ) => Promise<void>;

    // Save Entire Plant

    saveEdit: () => Promise<void>;
}

// Edit Plant Modal Props

export interface EditPlantModalProps {
    plant: PlantModel;
    editingFields: Set<keyof PlantModel>;
    changedFields: Set<keyof PlantModel>;
    saving: boolean;
    onClose: () => void;
    onEditField: (
        field: keyof PlantModel
    ) => void;
    onSaveField: (
        field: keyof PlantModel
    ) => void;
    onClearField: (
        field: keyof PlantModel
    ) => void;
    onChangeField: <
        K extends keyof PlantModel
    >(
        field: K,
        value: PlantModel[K]
    ) => void;
    onSave: () => Promise<void>;
}

// Editable Input Props

export interface EditableInputProps {
    label: string;
    value: string;
    editing: boolean;
    changed: boolean;
    onEdit: () => void;
    onSave: () => void;
    onChange: (
        value: string
    ) => void;
    onClear: () => void;
}

// Editable Textarea Props

export interface EditableTextareaProps {
    label: string;
    value: string;
    editing: boolean;
    changed: boolean;
    onEdit: () => void;
    onSave: () => void;
    onChange: (
        value: string
    ) => void;
    onClear: () => void;
    placeholder?: string;
}

// Create Modal

export interface CreatePlantModalProps {
    plant: Omit<PlantModel, "id">;
    saving: boolean;
    onClose: () => void;
    onChange: (
        field: keyof Omit<PlantModel, "id">,
        value: string | boolean | string[]
    ) => void;
    onSave: () => Promise<void>;
}

export interface PlantResponse {
    data: PlantModel[],
    message: string
}

export interface CreatePlantResponse {
    data: PlantModel,
    message: string
}


