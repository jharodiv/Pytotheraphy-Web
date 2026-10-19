export type AdminAction = "CREATE" | "UPDATE" | "DELETE";
export type TargetType = "Plant" | "Category" | "User";

export type AdminLog = {
    id: string;
    adminId: string;
    adminName: string;
    action: AdminAction;
    targetType: TargetType;
    targetId: string;
    target: string;
    details: string;
    timestamp: string;
    createdAt: string;
};

export type PaginatedLog = {
    data: AdminLog[];
    total: number;
    page: number;
    limit: number;
    totalPages: number; 
};

export type LogCounts = Record<AdminAction, number>;

//API Response Wrapper 

export type AdminLogResponse = {data: PaginatedLog};
export type RecentLogResponse = {data: AdminLog[]};
export type LogCountsResponse = {data: LogCounts};

export type GetLogsParams = {
    page?: number;
    limit?: number;
    action?: AdminAction;
    targetType?: TargetType;
    startDate?: string;
    search?: string;
}

