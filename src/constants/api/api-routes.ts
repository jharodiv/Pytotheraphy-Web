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
        UPDATE_PLANT: (plantId: string) => `/api/v1/admin/plants/update/${plantId}`,
    },
    CATEGORIES: {
        GET_CATEGORIES: "/api/v1/admin/categories/getCategories",
        GET_CATEGORY_BY_ID: (categoryId: string) => `/api/v1/admin/categories/getCategoryById/${categoryId}`,
        CREATE_CATEGORY: "/api/v1/admin/categories/create",
        UPDATE_CATEGORY: (categoryId: string) => `/api/v1/admin/categories/update/${categoryId}`,
    },
    USERS: {
        GET_USERS: "/api/v1/admin/user/getUsers",
        GET_USER_BY_ID: (userId: string) => `/api/v1/admin/user/${userId}`,
        CREATE_USER: "/api/v1/admin/user/createUser",
        UPDATE_USER: (userId: string) => `/api/v1/admin/user/updateUser/${userId}`,
        DELETE_USER: (userId: string) => `/api/v1/admin/user/deleteUser/${userId}`,
    }
}