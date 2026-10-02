export type PlantModel = {
    id: string;

    commonName: string;
    scientificName: string;
    family: string;
    description: string;
    medicinalProperties: string[];
    uses: string;
    preparation_method: string;
    origin: string;
    side_effect: string;
    verification: boolean;

    imageUrl: string;
    categories: string[];
}