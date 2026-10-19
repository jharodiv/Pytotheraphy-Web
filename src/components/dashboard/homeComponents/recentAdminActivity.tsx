import { ShieldCheck } from "lucide-react";

import { useRecentAdminLogs } from "@hooks/dashboard/useAdminLog/useRecentAdminLogs";
import type { AdminAction } from "@type/dashboard/adminlog.type";

interface RecentAdminActivityProps {
    onViewAll?: () => void;
}

const actionLabels: Record<AdminAction, string> = {
    CREATE: "Created",
    UPDATE: "Updated",
    DELETE: "Deleted",
};

function timeAgo(date: string) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (Number.isNaN(seconds)) return "";
    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    return new Date(date).toLocaleDateString();
}

export default function RecentAdminActivity({
    onViewAll,
}: RecentAdminActivityProps) {
    const {
        recentLogs,
        loading,
        error,
    } = useRecentAdminLogs();

    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e1e5de] px-6 py-5">
                <div>
                    <h3 className="text-base font-semibold text-[#263126]">
                        Recent Admin Activity
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        Recent changes made by administrators.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onViewAll}
                    className="cursor-pointer text-sm font-medium text-[#486344] transition hover:text-[#263126]"
                >
                    View all logs
                </button>
            </div>

            {/* Loading */}

            {loading && (
                <div className="flex min-h-40 items-center justify-center">
                    <p className="text-sm text-[#7b847a]">
                        Loading recent activity...
                    </p>
                </div>
            )}

            {/* Error */}

            {!loading && error && (
                <div className="flex min-h-40 items-center justify-center text-center">
                    <div>
                        <p className="text-sm font-medium text-red-600">
                            Failed to load recent activity
                        </p>

                        <p className="mt-1 text-xs text-[#929a91]">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* Empty */}

            {!loading && !error && recentLogs.length === 0 && (
                <div className="flex min-h-40 items-center justify-center">
                    <p className="text-sm text-[#7b847a]">
                        No recent admin activity.
                    </p>
                </div>
            )}

            {/* Log List */}

            {!loading && !error && recentLogs.length > 0 && (
                <div className="divide-y divide-[#eef0ec]">
                    {recentLogs.map((log) => (
                        <div
                            key={log.id}
                            className="flex items-center justify-between px-6 py-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f4ed]">
                                    <ShieldCheck className="h-4 w-4 text-[#486344]" />
                                </div>

                                <div>
                                    <p className="text-sm text-[#263126]">
                                        <span className="font-medium">
                                            {log.adminName}
                                        </span>{" "}
                                        {actionLabels[log.action]?.toLowerCase() ?? log.action}{" "}
                                        <span className="font-medium">
                                            {log.target}
                                        </span>
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#929a91]">
                                        {timeAgo(log.timestamp)}
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-full bg-[#f0f4ed] px-2.5 py-1 text-xs font-medium text-[#486344]">
                                {actionLabels[log.action] ?? log.action}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
