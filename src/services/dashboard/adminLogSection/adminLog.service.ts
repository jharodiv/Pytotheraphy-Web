import { apiRequest } from "@service/api/api";
import { API_ROUTES } from "@constant/api/api-routes";
import type {
    AdminLog,
    AdminLogResponse,
    PaginatedLog,
    LogCounts,
    LogCountsResponse,
    GetLogsParams
} from "@type/dashboard/adminlog.type";

export async function getAdminLogs(params: GetLogsParams): Promise<PaginatedLog> {
    try {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.set(key, String(value));
            } 
        });

        const queryString = query.toString();

        const response = await apiRequest<AdminLogResponse>(
            `${API_ROUTES.ADMIN_LOGS.GET_LOGS}${queryString ? `?${queryString}` : ""}`,
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to fetch admin logs", error);
        throw new Error("Unable to load admin logs");
    }
}


export async function getRecentAdminLogs(): Promise<AdminLog[]> {
    try {
        // Backend sends the array directly, without a { data } wrapper
        const response = await apiRequest<AdminLog[]>(
            API_ROUTES.ADMIN_LOGS.GET_RECENT_LOGS,
            {
                method: "GET",
            }
        );

        return response;

    } catch (error) {
        console.error("Failed to fetch recent admin logs", error);
        throw new Error("Unable to load recent admin logs");
    }
}

export async function getAdminLogCounts(): Promise<LogCounts> {
    try {
        const response = await apiRequest<LogCountsResponse>(
            API_ROUTES.ADMIN_LOGS.GET_LOG_COUNTS,
            {
                method: "GET",
            }
        );

        return response.data;
    } catch (err) {
        console.error("Failed to fetch admin log counts", err);
        throw new Error("Unable to load admin log counts");
    }
}
