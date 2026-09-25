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
        const usersRef = collection(db, USERS_COLLECTION);

        const currentYear = new Date().getFullYear();

        const monthQueries = Array.from({ length: 12 }, (_, month) => {
            const startDate = new Date(
                currentYear,
                month,
                1
            );

            const endDate = new Date(
                currentYear,
                month + 1,
                1
            );

            return getCountFromServer(
                query(
                    usersRef,
                    where(
                        "created_at",
                        ">=",
                        Timestamp.fromDate(startDate)
                    ),
                    where(
                        "created_at",
                        "<",
                        Timestamp.fromDate(endDate)
                    )
                )
            );
        });

        const snapshot = await Promise.all(monthQueries);

        return snapshot.map((snapshot, index) => ({
            month: new Date(
                currentYear,
                index,
                1
            ).toLocaleString("en-US", {
                month: "short",
            }),
            count: snapshot.data().count,
        }));

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