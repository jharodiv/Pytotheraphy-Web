import type {
    CategoryDetailModel,
    CategoryModel,
} from "@model/dashboard/categories.model";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type {
    CategoriesResponse,
    CategoryDetailResponse,
    CategoryResponse,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from "@type/dashboard/categoties.type";

/**
 * Get all categories, including how many plants each one has.
 */

export async function getCategories(): Promise<CategoryModel[]> {
    try {
        const response = await apiRequest<CategoriesResponse>(
            API_ROUTES.CATEGORIES.GET_CATEGORIES,
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to fetch the categories",
            error
        );

        throw new Error(
            "Unable to load categories"
        );
    }
}

/**
 * Get a category by ID, including its verified and unverified plants.
 */

export async function getCategoryById(
    id: string
): Promise<CategoryDetailModel> {
    try {
        const response = await apiRequest<CategoryDetailResponse>(
            API_ROUTES.CATEGORIES.GET_CATEGORY_BY_ID(id),
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Failed to fetch category with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to load plants for this category"
        );
    }
}

/**
 * Create a new category.
 */

export async function createCategory(
    category: CreateCategoryPayload
): Promise<CategoryModel> {
    try {
        const response = await apiRequest<CategoryResponse>(
            API_ROUTES.CATEGORIES.CREATE_CATEGORY,
            {
                method: "POST",
                body: JSON.stringify(category),
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to create category:",
            error
        );

        // Keep the backend message (e.g. "Category already exists")
        throw error instanceof Error
            ? error
            : new Error("Unable to create category");
    }
}

/**
 * Update an existing category.
 */

export async function updateCategory(
    id: string,
    category: UpdateCategoryPayload
): Promise<CategoryModel> {
    try {
        const response = await apiRequest<CategoryResponse>(
            API_ROUTES.CATEGORIES.UPDATE_CATEGORY(id),
            {
                method: "PUT",
                body: JSON.stringify(category),
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Failed to update category with ID ${id}:`,
            error
        );

        throw error instanceof Error
            ? error
            : new Error("Unable to update category");
    }
}
