import { useEffect, useState } from "react";

import type { AdminLog } from "@type/dashboard/adminlog.type";
import { getRecentAdminLogs } from "@service/dashboard/adminLogSection/adminLog.service";

export function useRecentAdminLogs() {
    const [recentLogs, setRecentLogs] = useState<AdminLog[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadRecentLogs() {
            try {
                setLoading(true);
                setError(null);

                const data = await getRecentAdminLogs();

                setRecentLogs(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load recent admin activity."
                );
            } finally {
                setLoading(false);
            }
        }

        loadRecentLogs();
    }, []);

    return {
        recentLogs,
        loading,
        error,
    };
}
