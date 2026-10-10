import {
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    runTransaction,
} from "firebase/firestore";

import { db } from "@service/database/firebase";

import type { PlantModel } from "@model/dashboard/plants.model";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type { PlantResponse, CreatePlantResponse } from "@type/dashboard/plant.types";

const PLANT_COLLECTION = "plants";
const PLANT_CACHE_COLLECTION = "plant_cache";

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
): Promise<void> {
    try {
        const plantRef = doc(db, PLANT_COLLECTION, id);
        const cacheRef = doc(db, PLANT_CACHE_COLLECTION, id);

        const [plantSnapshot, cacheSnapshot] = await Promise.all([
            getDoc(plantRef),
            getDoc(cacheRef)
        ])

        if (plantSnapshot.exists()) {
            await updateDoc(plantRef, plant);
            return;
        }

        if (cacheSnapshot.exists()) {
            await updateDoc(cacheRef, plant);
            return;
        }

        throw new Error(
            `Plant with ID ${id} does not exist`
        );

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

export async function verifyPlant(
    id: string
): Promise<void> {
    try {
        const plantRef = doc(db, PLANT_COLLECTION, id);
        const cacheRef = doc(db, PLANT_CACHE_COLLECTION, id);

        await runTransaction(db, async (transaction) => {
            const cacheSnapshot = await transaction.get(cacheRef);

            if (!cacheSnapshot.exists()) {
                throw new Error("Plant not found in plant cache");
            }

            const plantData = cacheSnapshot.data();

            transaction.set(plantRef, {
                ...plantData,
                verified: true
            });


            transaction.delete(cacheRef);
        })
    } catch (error) {
        console.error(
            "Failed to verify plant",
        );

        throw new Error("Unable to verify plant");
    }
}

export async function unverifyPlant(
    id: string
): Promise<void> {
    try {
        const plantRef = doc(db, PLANT_COLLECTION, id);
        const cacheRef = doc(db, PLANT_CACHE_COLLECTION, id);

        await runTransaction(db, async (transaction) => {
            const plantSnapshot = await transaction.get(plantRef);

            if (!plantSnapshot.exists()) {
                throw new Error("Plant not found in verified plants")
            }

            const plantData = plantSnapshot.data();

            transaction.set(cacheRef, {
                ...plantData,
                verified: false
            });

            transaction.delete(plantRef);
        })
    } catch (error) {
        console.error(
            "Failed to unverify the plant"
        )

        throw new Error(
            "Unable to unverify the plant"
        )
    }
} 