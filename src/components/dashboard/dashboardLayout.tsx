import { useState } from "react";

import Sidebar from "@components/dashboard/sidebar";
import Header from "@components/dashboard/header";

import Home from "@pages/dashboard/home";
import Plants from "@pages/dashboard/plants";
import Categories from "@pages/dashboard/categories";
import Users from "@pages/dashboard/users";
import AdminLogs from "@pages/dashboard/adminLogs";

export default function DashboardLayout() {
    const [activePage, setActivePage] = useState("home");

    function renderPage() {
        switch (activePage) {
            case "plants":
                return <Plants />;

            case "categories":
                return <Categories />;

            case "users":
                return <Users />;

            case "adminLogs":
                return <AdminLogs />;

            default:
                return <Home onNavigate={setActivePage} />;
        }
    }

    function getHeader() {
        switch (activePage) {
            case "plants":
                return {
                    title: "Plants",
                    description:
                        "Manage and verify your plant database.",
                };

            case "categories":
                return {
                    title: "Categories",
                    description:
                        "Manage plant categories.",
                };

            case "users":
                return {
                    title: "Users",
                    description:
                        "Manage registered users.",
                };

            case "adminLogs":
                return {
                    title: "Admin Logs",
                    description:
                        "Track changes made by administrators.",
                };

            default:
                return {
                    title: "Dashboard",
                    description:
                        "Overview of your Phytotherapy application.",
                };
        }
    }

    const header = getHeader();

    function handleLogout() {
        console.log("Logout clicked");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#f4f6f2]">
            {/* Sidebar stays fixed */}
            <Sidebar
                activePage={activePage}
                onNavigate={setActivePage}
                onLogout={handleLogout}
            />

            {/* Dashboard area */}
            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    title={header.title}
                    description={header.description}
                />

                {/* Only this area scrolls */}
                <main className="min-h-0 flex-1 overflow-y-auto p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}