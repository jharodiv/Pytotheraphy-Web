import {
    FolderTree,
    LayoutDashboard,
    Leaf,
    LogOut,
    ScrollText,
    Users,
} from "lucide-react";

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    onLogout: () => void;
}

const navigation = [
    {
        name: "Home",
        key: "home",
        icon: LayoutDashboard,
    },
    {
        name: "Plants",
        key: "plants",
        icon: Leaf,
    },
    {
        name: "Categories",
        key: "categories",
        icon: FolderTree,
    },
    {
        name: "Users",
        key: "users",
        icon: Users,
    },
    {
        name: "Admin Logs",
        key: "adminLogs",
        icon: ScrollText,
    },
];

export default function Sidebar({
    activePage,
    onNavigate,
    onLogout,
}: SidebarProps) {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-[#e1e5de] bg-white">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-[#e8ebe5] px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4ed]">
                        <Leaf className="h-5 w-5 text-[#486344]" />
                    </div>

                    <div>
                        <h1 className="text-base font-semibold text-[#263126]">
                            Phytotherapy
                        </h1>

                        <p className="text-xs text-[#8a9288]">
                            Admin Portal
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-[#9aa198]">
                    Management
                </p>

                {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = activePage === item.key;

                    return (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onNavigate(item.key)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active
                                    ? "bg-[#edf2ea] text-[#486344]"
                                    : "text-[#687167] hover:bg-[#f6f8f5] hover:text-[#3f4d3d]"
                                }`}
                        >
                            <Icon className="h-5 w-5" />

                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-[#e8ebe5] p-3">
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#687167] transition hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="h-5 w-5" />

                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}