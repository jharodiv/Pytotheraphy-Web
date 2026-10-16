import type { CategoryModel } from "@model/dashboard/categories.model";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory as updateCategoryRequest,
} from "@service/dashboard/categorySection/category.service";
import type {
    CategoryPlantItem,
    UseCategoriesReturn,
} from "@type/dashboard/categoties.type";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCategories(): UseCategoriesReturn {

    // Data State

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [search, setSearch] = useState("");

    // Status State

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Category Plants Modal State

    const [isCategoryPlantsModalOpen, setIsCategoryPlantsModalOpen] = useState(false);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryPlants, setSelectedCategoryPlants] = useState<CategoryPlantItem[]>([]);
    const [loadingCategoryPlants, setLoadingCategoryPlants] = useState(false);
    const [categoryPlantsError, setCategoryPlantsError] = useState<string | null>(null);

    // Create / Edit Modal State

    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);

    // Fetch Categories

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(
                "Failed to fetch categories:",
                error
            );

            setError(error instanceof Error ? error.message : "Unable to load categories");
        } finally {
            setLoading(false);
        }
    }, []);

    // Filter Categories

    const filteredCategories = useMemo(() => {
        const searchTerm = search.toLowerCase().trim();

        return categories.filter((category) =>
            category.name
                .toLowerCase()
                .includes(searchTerm)
        );
    }, [categories, search]);

    // Category Plants Modal

    const openPlantModal = useCallback(async (category: CategoryModel) => {
        setSelectedCategoryName(category.name);
        setSelectedCategoryPlants([]);
        setCategoryPlantsError(null);
        setIsCategoryPlantsModalOpen(true);

        try {
            setLoadingCategoryPlants(true);

            const detail = await getCategoryById(category.id);

            setSelectedCategoryPlants([
                ...detail.plants.map((plant) => ({
                    ...plant,
                    verified: true,
                })),
                ...detail.plantCaches.map((plant) => ({
                    ...plant,
                    verified: false,
                })),
            ]);
        } catch (error) {
            console.error(
                "Failed to fetch the category plants",
                error
            );

            setCategoryPlantsError(error instanceof Error ? error.message : "Unable to load plants for this category");
        } finally {
            setLoadingCategoryPlants(false);
        }
    }, []);

    const closePlantModal = useCallback(() => {
        setIsCategoryPlantsModalOpen(false);
        setSelectedCategoryName("");
        setSelectedCategoryPlants([]);
    }, []);

    // Create Modal

    const openNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(true);
    }, []);

    const closeNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(false);
    }, []);

    // Throws on failure so the modal can stay open and show the error
    const createNewCategory = useCallback(
        async (name: string, description: string): Promise<void> => {
            try {
                setIsCreating(true);

                const newCategory = await createCategory({
                    name,
                    ...(description && { description }),
                });

                setCategories((current) =>
                    [...current, newCategory].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )
                );
            } finally {
                setIsCreating(false);
            }
        }, []
    );

    // Edit Modal

    const openEditCategoryModal = useCallback(
        (category: CategoryModel) => {
            setSelectedCategory(category);
            setIsEditCategoryModalOpen(true);
        },
        []
    );

    const closeEditCategoryModal = useCallback(() => {
        setIsEditCategoryModalOpen(false);
        setSelectedCategory(null);
    }, []);

    // Throws on failure so the modal can stay open and show the error
    const updateCategory = useCallback(
        async (id: string, name: string, description: string): Promise<void> => {
            try {
                setIsUpdating(true);

                const updatedCategory = await updateCategoryRequest(id, {
                    name,
                    // Empty description clears it
                    description: description || null,
                });

                setCategories((current) =>
                    current
                        .map((category) =>
                            category.id === id
                                ? updatedCategory
                                : category
                        )
                        .sort((a, b) =>
                            a.name.localeCompare(b.name)
                        )
                );
            } finally {
                setIsUpdating(false);
            }
        }, []
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        filteredCategories,

        search,
        setSearch,

        loading,
        error,

        isCreating,
        isUpdating,

        fetchCategories,

        // Category plants modal
        isCategoryPlantsModalOpen,
        selectedCategoryName,
        selectedCategoryPlants,
        loadingCategoryPlants,
        categoryPlantsError,
        openPlantModal,
        closePlantModal,

        // Create modal
        isNewCategoryModalOpen,
        openNewCategoryModal,
        closeNewCategoryModal,
        createNewCategory,

        // Edit modal
        isEditCategoryModalOpen,
        selectedCategory,
        openEditCategoryModal,
        closeEditCategoryModal,
        updateCategory,
    };
}
