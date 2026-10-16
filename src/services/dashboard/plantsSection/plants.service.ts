

import type { PlantModel } from "@model/dashboard/plants.model";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type { PlantResponse, CreatePlantResponse } from "@type/dashboard/plant.types";

/**
 * Get all verified plants from the plants collection.
 */
export async function getVerifiedPlant(): Promise<PlantModel[]> {
    try {

        const response = await apiRequest<PlantResponse>(
            API_ROUTES.PLANTS.GET_VERIFIED_PLANTS,
            {
                method: "GET",
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            "Failed to fetch verified plants",
            error
        );

        throw new Error(
            "Unable to load verified plants"
        );
    }

    /**
     * Get all unverified plants from the plant_cache collection.
     */
}

export async function getUnverifiedPlant(): Promise<PlantModel[]> {
    try {

        const response = await apiRequest<PlantResponse>(
            API_ROUTES.PLANTS.GET_UNVERIFIED_PLANTS,
            {
                method: "GET",
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            "Failed to fetch unverified plants",
            error
        );

        throw new Error(
            "Unable to load verified plants"
        );
    }
}
/**
 * Get all plants from both verified and unverified collections.
 */

export async function getPlants(): Promise<PlantModel[]> {
    try {
        const [verifiedPlants, unverifiedPlants] =
            await Promise.all([
                getVerifiedPlant(),
                getUnverifiedPlant(),
            ]);

        return [
            ...verifiedPlants,
            ...unverifiedPlants,
        ];
    } catch (error) {
        console.error(
            "Failed to fetch plants:",
            error
        );

        throw new Error(
            "Unable to load plants."
        );
    }
}

/**
 * Get a verified plant by its Firestore document ID.
 */

export async function getPlantById(
    id: string
): Promise<PlantResponse | null> {
    try {
        const response = await apiRequest<PlantResponse>(
            API_ROUTES.PLANTS.GET_PLANT_BY_ID(id),
            {
                method: "GET",
            }
        );

        return response;
    } catch (error) {
        console.error(
            `Failed to fetch plant with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to load plant"
        );
    }
}

/**
 * Add a new verified plant.
 */

export async function addPlant(
    plant: Omit<PlantModel, "id">
): Promise<PlantModel> {
    try {
        const response = await apiRequest<CreatePlantResponse>(
            API_ROUTES.PLANTS.CREATE_PLANT,
            {
                method: "POST",
                body: JSON.stringify(plant),
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to add plant", error);

        throw new Error("Unable to add plant");
    }
}

/**
 * Update an existing verified plant.
 */

    export async function updatePlant(
        id: string,
        plant: Partial<Omit<PlantModel, "id">>
    ): Promise<PlantModel> {
        try {
            const response = await apiRequest<PlantModel>(
                API_ROUTES.PLANTS.UPDATE_PLANT(id),
                {
                    method: "PUT",
                    body: JSON.stringify(plant),
                }
            );

            return response;    
        } catch (error) {
            console.error(
                `Failed to update plant with ID ${id}:`,
                error
            );

            throw new Error(
                "Unable to update plant."
            );
        }
    }

/**
 * Delete an existing verified plant.
 */

export async function deletePlant(
    id: string,
): Promise<void> {
    try {
        const response = await apiRequest<void>(
            API_ROUTES.PLANTS.DELETE_PLANT(id),
            {
                method: "DELETE",
            }
        );
        return response;
    } catch (error) {
        console.error(
            "Failed to delete the plant"
        );

        throw new Error(
            "Unable to delete plant"
        );
    }
}