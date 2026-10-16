import type {
    CategoryDetailModel,
    CategoryModel,
    CategoryPlant,
} from "@model/dashboard/categories.model";

// Request Payloads

export type CreateCategoryPayload = {
    name: string;
    description?: string;
}

export type UpdateCategoryPayload = {
    name?: string;
    // null clears the description
    description?: string | null;
}

// API Responses

export interface CategoriesResponse {
    data: CategoryModel[],
    message: string
}

export interface CategoryResponse {
    data: CategoryModel,
    message: string
}

export interface CategoryDetailResponse {
    data: CategoryDetailModel,
    message: string
}

// Plants shown inside a category

export type CategoryPlantItem = CategoryPlant & {
    verified: boolean;
}

// useCategories Return Type

export interface UseCategoriesReturn {
    categories: CategoryModel[];
    filteredCategories: CategoryModel[];

    search: string;
    setSearch: (search: string) => void;

    loading: boolean;
    error: string | null;

    isCreating: boolean;
    isUpdating: boolean;

    fetchCategories: () => Promise<void>;

    // Category plants modal
    isCategoryPlantsModalOpen: boolean;
    selectedCategoryName: string;
    selectedCategoryPlants: CategoryPlantItem[];
    loadingCategoryPlants: boolean;
    categoryPlantsError: string | null;
    openPlantModal: (category: CategoryModel) => Promise<void>;
    closePlantModal: () => void;

    // Create modal
    isNewCategoryModalOpen: boolean;
    openNewCategoryModal: () => void;
    closeNewCategoryModal: () => void;
    createNewCategory: (name: string, description: string) => Promise<void>;

    // Edit modal
    isEditCategoryModalOpen: boolean;
    selectedCategory: CategoryModel | null;
    openEditCategoryModal: (category: CategoryModel) => void;
    closeEditCategoryModal: () => void;
    updateCategory: (id: string, name: string, description: string) => Promise<void>;
}

// Modal Props

export interface CategoryPlantsModalProps {
    isOpen: boolean;
    categoryName: string;
    plants: CategoryPlantItem[];
    loading: boolean;
    error: string | null;
    onClose: () => void;
}

export interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string) => Promise<void>;
    isCreating: boolean;
}

export interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (id: string, name: string, description: string) => Promise<void>;
    isEditing: boolean;
    category: CategoryModel | null;
}
