import {
    CheckCircle2,
    Leaf,
    ShieldCheck,
    Users,
} from "lucide-react";

import StatCard from "@components/dashboard/homeComponents/statCard";
import PlantVerification from "@components/dashboard/homeComponents/plantVerification";
import UserGrowth from "@components/dashboard/homeComponents/userGrowth";
import RecentAdminActivity from "@components/dashboard/homeComponents/recentAdminActivity";
import { useDashboardStats } from "@hooks/dashboard/useDashboardStats";

export default function Home() {

    const {
        stats,
        loading,
        error,
    } = useDashboardStats();

    if (loading) {
        return (<div className="flex min-h-[400px] items-center justify-center"> <p className="text-sm text-[#7b847a]"> Loading dashboard... </p> </div>);
    }

    if (error || !stats) {
        return (<div className="rounded-xl border border-[#e1e5de] bg-white p-8 text-center shadow-sm"> <h3 className="text-base font-semibold text-[#263126]"> Unable to load dashboard </h3> <p className="mt-2 text-sm text-[#7b847a]"> {error ?? "Dashboard statistics are unavailable."} </p> </div>);
    }

    return (
        <div className="space-y-6">
            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Plants"
                    value={stats.totalPlants?.toLocaleString() ?? "0"}
                    description="Plants in database"
                    icon={Leaf}
                />

                <StatCard
                    title="Verified Plants"
                    value={stats.verifiedPlants?.toLocaleString() ?? "0"}
                    description="Verified by admin"
                    icon={ShieldCheck}
                />

                <StatCard
                    title="Unverified Plants"
                    value={stats.unverifiedPlants?.toLocaleString() ?? "0"}
                    description="Awaiting verification"
                    icon={CheckCircle2}
                />

                <StatCard
                    title="Total Users"
                    value={stats.totalUsers?.toLocaleString() ?? "0"}
                    description="Registered users"
                    icon={Users}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <PlantVerification
                    verified={stats.verifiedPlants}
                    unverified={stats.unverifiedPlants} />
                <UserGrowth />
            </div>

            {/* Recent Admin Activity */}
            <RecentAdminActivity />
        </div>
    );
}