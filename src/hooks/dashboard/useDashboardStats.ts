import { useEffect, useState } from "react";

import type { DashboardStats } from "@model/dashboard/dashboard.model";
import { getDashboardStats } from "@service/dashboard/dashboardHome.service";
import type { UserMonthlyCount } from "@model/dashboard/dashboard.model";
import { getUserPerMonth } from "@service/dashboard/dashboardHome.service";

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const [userGrowth, setUserGrowth] = useState<UserMonthlyCount[]>([]);

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true);
                setError(null);

                const data = await getDashboardStats();

                setStats(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load dashboard statistics."
                );
            } finally {
                setLoading(false);
            }
        }

        async function loadUserGrowth() {
            try {
                const data = await getUserPerMonth();

                setUserGrowth(data);
            } catch (err) {
                console.error(
                    "Failed to load user growth:",
                    err
                );
            }
        }

        loadStats();
        loadUserGrowth();

    }, []);

    return {
        stats,
        loading,
        error,
        userGrowth,
    };
}