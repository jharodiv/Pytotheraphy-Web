export type CategoryModel = {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;

    // Number of verified (plants) and unverified (plantCaches) plants
    _count: {
        plants: number;
        plantCaches: number;
    };
}

export type CategoryPlant = {
    id: string;
    commonName: string;
    scientificName: string;
}

export type CategoryDetailModel = Omit<CategoryModel, "_count"> & {
    plants: CategoryPlant[];
    plantCaches: CategoryPlant[];
}
