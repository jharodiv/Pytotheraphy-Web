import { db } from "@service/database/firebase";
import {
    collection,
    getCountFromServer,
    query,
    where,
    Timestamp
} from "firebase/firestore";

import { type DashboardStats, type UserMonthlyCount } from "@model/dashboard/dashboard.model";
import { API_ROUTES } from "@constant/api/api-routes";
import { apiRequest } from "@service/api/api";

const USERS_COLLECTION = "users";

// GET THE COUNT OF THE TOTAL PLANTS, VERIFIED PLANTS,
// UNVERIFIED PLANTS, AND TOTAL USERS USING FIRESTORE

export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const response = await apiRequest<DashboardStats>(
            API_ROUTES.DASHBOARD.GET_DASHBOARD,
            {
                method: "GET",
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Failed to fetch dashboard statistics:",
            error
        );

        throw new Error(
            "Unable to load dashboard statistics."
        );
    }
}

export async function getUserPerMonth(): Promise<UserMonthlyCount[]> {
    try {

        const response = await apiRequest<UserMonthlyCount[]>(
            API_ROUTES.DASHBOARD.GET_USER_PER_MONTH,
            {
                method: "GET",
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Failed to fetch monthly user counts",
            error
        );

        throw new Error(
            "Unable to load monthly user statistic"
        );
    }
}

// Will create another service for the admin recent activities: