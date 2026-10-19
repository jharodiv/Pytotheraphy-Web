import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ScrollText,
    Search,
} from "lucide-react";

import { useAdminLog } from "@hooks/dashboard/useAdminLog/useAdminLog";
import type {
    AdminAction,
    TargetType,
} from "@type/dashboard/adminlog.type";

const ACTIONS: AdminAction[] = ["CREATE", "UPDATE", "DELETE"];
const TARGET_TYPES: TargetType[] = ["Plant", "Category", "User"];

const actionStyles: Record<AdminAction, string> = {
    CREATE: "bg-[#edf2ea] text-[#486344]",
    UPDATE: "bg-[#eef3f8] text-[#46617a]",
    DELETE: "bg-[#fbeeee] text-[#b74747]",
};

export default function AdminLogs() {
    const {
        logs,
        counts,
        loading,
        error,
        params,
        updateParams,
    } = useAdminLog();

    const [search, setSearch] = useState(params.search ?? "");

    // Wait until typing stops before re-fetching
    useEffect(() => {
        const timeout = setTimeout(() => {
            const value = search.trim() || undefined;

            if (value !== params.search) {
                updateParams({ search: value });
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, params.search, updateParams]);

    const entries = logs?.data ?? [];
    const page = logs?.page ?? 1;
    const totalPages = logs?.totalPages ?? 1;

    return (
        <div className="space-y-6">

            {/* Header                                                        */}

            <div>
                <h3 className="text-lg font-semibold text-[#263126]">
                    Admin Logs
                </h3>

                <p className="mt-1 text-sm text-[#7b847a]">
                    Every change made by administrators.
                </p>
            </div>

            {/* Action Counts                                                 */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {ACTIONS.map((action) => (
                    <div
                        key={action}
                        className="rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-[#7b847a]">
                            {action}
                        </p>

                        <p className="mt-2 text-2xl font-semibold text-[#263126]">
                            {counts ? counts[action] ?? 0 : "—"}
                        </p>
                    </div>
                ))}
            </div>

            {/* Logs Card                                                     */}

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">

                {/* Filters */}

                <div className="flex flex-col gap-3 border-b border-[#e8ebe5] p-4 sm:flex-row sm:items-center">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search target, admin or details..."
                            className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                        />
                    </div>

                    <select
                        value={params.action ?? ""}
                        onChange={(event) =>
                            updateParams({
                                action: (event.target.value || undefined) as AdminAction | undefined,
                            })
                        }
                        className="rounded-lg border border-[#dfe4dc] px-3 py-2.5 text-sm text-[#263126] outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                    >
                        <option value="">All actions</option>
                        {ACTIONS.map((action) => (
                            <option key={action} value={action}>
                                {action}
                            </option>
                        ))}
                    </select>

                    <select
                        value={params.targetType ?? ""}
                        onChange={(event) =>
                            updateParams({
                                targetType: (event.target.value || undefined) as TargetType | undefined,
                            })
                        }
                        className="rounded-lg border border-[#dfe4dc] px-3 py-2.5 text-sm text-[#263126] outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                    >
                        <option value="">All targets</option>
                        {TARGET_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading                                                       */}

                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <p className="text-sm text-[#7b847a]">
                            Loading admin logs...
                        </p>
                    </div>
                )}

                {/* Error                                                         */}

                {!loading && error && (
                    <div className="flex min-h-64 items-center justify-center text-center">
                        <div>
                            <p className="text-sm font-medium text-red-600">
                                Failed to load admin logs
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty                                                         */}

                {!loading &&
                    !error &&
                    entries.length === 0 && (
                        <div className="flex min-h-64 flex-col items-center justify-center text-center">
                            <ScrollText className="h-10 w-10 text-[#b3c0ae]" />

                            <p className="mt-3 text-sm font-medium text-[#596257]">
                                No logs to display
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {params.search || params.action || params.targetType
                                    ? "Try adjusting your filters."
                                    : "Admin activity will appear here."}
                            </p>
                        </div>
                    )}

                {/* Log List                                                      */}

                {!loading &&
                    !error &&
                    entries.length > 0 && (
                        <div className="divide-y divide-[#e8ebe5]">
                            {entries.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center gap-3 p-4"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f4ed]">
                                        <ScrollText className="h-4 w-4 text-[#486344]" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm text-[#263126]">
                                            <span className="font-medium">
                                                {log.adminName}
                                            </span>{" "}
                                            {log.action.toLowerCase()}{" "}
                                            {log.targetType.toLowerCase()}{" "}
                                            <span className="font-medium">
                                                {log.target}
                                            </span>
                                        </p>

                                        {log.details && (
                                            <p className="mt-1 truncate text-xs text-[#7b847a]">
                                                {log.details}
                                            </p>
                                        )}
                                    </div>

                                    <span className="hidden shrink-0 text-xs text-[#929a91] sm:block">
                                        {new Date(
                                            log.timestamp
                                        ).toLocaleString()}
                                    </span>

                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${actionStyles[log.action]}`}
                                    >
                                        {log.action}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                {/* Pagination                                                    */}

                {!error && logs && logs.total > 0 && (
                    <div className="flex items-center justify-between border-t border-[#e8ebe5] px-4 py-3">
                        <p className="text-xs text-[#7b847a]">
                            Page {page} of {totalPages} · {logs.total} logs
                        </p>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={page <= 1 || loading}
                                onClick={() =>
                                    updateParams({ page: page - 1 })
                                }
                                className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#dfe4dc] px-3 py-1.5 text-xs font-medium text-[#486344] transition hover:bg-[#f6f8f5] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <button
                                type="button"
                                disabled={page >= totalPages || loading}
                                onClick={() =>
                                    updateParams({ page: page + 1 })
                                }
                                className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#dfe4dc] px-3 py-1.5 text-xs font-medium text-[#486344] transition hover:bg-[#f6f8f5] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
