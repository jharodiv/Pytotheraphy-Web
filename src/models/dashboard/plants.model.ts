export type PlantCategory = {
    id: string;
    name: string;
}

export type PlantModel = {
    id: string;

    commonName: string;
    scientificName: string;
    family: string;
    description: string;
    uses: string;
    preparationMethod: string;
    origin: string;
    sideEffect: string;
    verification: boolean;

    imageUrl: string;
    categories: PlantCategory[];
}