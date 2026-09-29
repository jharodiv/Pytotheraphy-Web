import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type {
    UserMonthlyCount,
} from "@model/dashboard/dashboard.model";

interface UserGrowthProps {
    userGrowth: UserMonthlyCount[];
}

export default function UserGrowth({
    userGrowth,
}: UserGrowthProps) {
    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white p-6 shadow-sm">
            <div>
                <h3 className="text-base font-semibold text-[#263126]">
                    User Growth
                </h3>

                <p className="mt-1 text-sm text-[#7b847a]">
                    Registered users over time
                </p>
            </div>

            <div className="mt-6 h-64">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={userGrowth}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            width={35}
                            tick={{
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e1e5de",
                                boxShadow:
                                    "0 2px 8px rgba(0, 0, 0, 0.08)",
                            }}
                            labelStyle={{
                                fontWeight: 600,
                            }}
                            formatter={(value) => [
                                value,
                                "Users",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#486344"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                strokeWidth: 2,
                                fill: "#ffffff",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}