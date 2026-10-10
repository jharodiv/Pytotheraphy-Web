export const API_ROUTES = {
    AUTH: {
        ADMIN_LOGIN: "/api/v1/auth/admin/login"
    },
    DASHBOARD: {
        GET_DASHBOARD: "/api/v1/admin/dashboard/stats",
        GET_USER_PER_MONTH: "/api/v1/admin/dashboard/user-per-month"
    },
    PLANTS: {
        GET_VERIFIED_PLANTS: "/api/v1/admin/plants/getPlants",
        GET_UNVERIFIED_PLANTS: "/api/v1/admin/plants/getCachePlants",
        GET_PLANT_BY_ID: (plantId: string) => `/api/v1/admin/plants/getPlant/${plantId}`,
        CREATE_PLANT: "/api/v1/admin/plants/create",
        DELETE_PLANT: (plantId: string) => `/api/v1/admin/plants/delete/${plantId}`,
    }
}