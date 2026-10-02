import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    runTransaction,
    type DocumentData,
    type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@service/database/firebase";

import type { PlantModel } from "@model/dashboard/plants.model";
import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type { PlantReponse } from "@type/dashboard/plant.types";

const PLANT_COLLECTION = "plants";
const PLANT_CACHE_COLLECTION = "plant_cache";

/**
 * Convert a Firestore document into a PlantModel.
 */

function mapPlant(
    snapshot: QueryDocumentSnapshot<DocumentData>
): PlantModel {
    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as PlantModel;
}

/**
 * Get all verified plants from the plants collection.
 */
export async function getVerifiedPlant(): Promise<PlantModel[]> {
    try {

        const response = await apiRequest<PlantReponse>(
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

        const response = await apiRequest<PlantReponse>(
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
): Promise<PlantModel | null> {
    try {
        const plantRef = doc(db, PLANT_COLLECTION, id);

        const snapshot = await getDoc(plantRef);

        if (!snapshot.exists()) {
            return null;
        }

        return {
            id: snapshot.id,
            ...snapshot.data(),
        } as PlantModel;
    } catch (error) {
        console.error(
            `Failed to fetch plant with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to load plants"
        );
    }
}

/**
 * Add a new verified plant.
 */

export async function addPlant(plant: Omit<PlantModel, "id">): Promise<PlantModel> {
    try {

        const collectionName = plant.verification
            ? PLANT_COLLECTION
            : PLANT_CACHE_COLLECTION;

        const plantRef = collection(db, collectionName);

        const document = await addDoc(
            plantRef,
            plant
        );

        return {
            id: document.id,
            ...plant,
        };
    } catch (error) {
        console.error(
            " Failed to add plant",
            error
        );

        throw new Error(
            " Unable to add Plant"
        );
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
        const plantRef = doc(db, PLANT_COLLECTION, id);
        const cacheRef = doc(db, PLANT_CACHE_COLLECTION, id);

        // check verified plants

        const plantSnapshot = await getDoc(plantRef);

        if (plantSnapshot.exists()) {
            await deleteDoc(plantRef);

            return;
        }

        const cacheSnapshot = await getDoc(cacheRef);

        if (cacheSnapshot.exists()) {
            await deleteDoc(cacheRef);

            return;
        }

        throw new Error(
            `Plant with ID ${id} does not exist.`
        );
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