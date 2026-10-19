import { useCallback, useEffect, useState } from "react";

import type {
    AdminLog,
    GetLogsParams,
    LogCounts,
    PaginatedLog,
} from "@type/dashboard/adminlog.type";
import {
    getAdminLogs,
    getAdminLogCounts,
    getRecentAdminLogs,
} from "@service/dashboard/adminLogSection/adminLog.service";

export function useAdminLog(initialParams: GetLogsParams = { page: 1, limit: 10 }) {
    const [params, setParams] = useState<GetLogsParams>(initialParams);

    const [logs, setLogs] = useState<PaginatedLog | null>(null);

    const [recentLogs, setRecentLogs] = useState<AdminLog[]>([]);

    const [counts, setCounts] = useState<LogCounts | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const loadLogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getAdminLogs(params);

            setLogs(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load admin logs."
            );
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    useEffect(() => {
        async function loadSummary() {
            try {
                const [recent, countData] = await Promise.all([
                    getRecentAdminLogs(),
                    getAdminLogCounts(),
                ]);

                setRecentLogs(recent);
                setCounts(countData);
            } catch (err) {
                console.error("Failed to load admin log summary:", err);
            }
        }

        loadSummary();
    }, []);

    const updateParams = useCallback((next: Partial<GetLogsParams>) => {
        setParams((prev) => ({ ...prev, page: 1, ...next }));
    }, []);

    return {
        logs,
        recentLogs,
        counts,
        loading,
        error,
        params,
        updateParams,
        refresh: loadLogs,
    };
}
