import { StaffDirectoryClient } from "./StaffDirectoryClient"

export const metadata = {
    title: "Staff Directory | ER CareView",
    description: "Search for emergency department staff members",
}

export default function StaffDirectoryPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
            {/* Nav */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1e2d40]">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-white font-semibold text-sm">CareView</span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="text-[#8892a4] text-sm hover:text-white cursor-pointer transition-colors">Dashboard</span>
                    <span className="text-[#8892a4] text-sm hover:text-white cursor-pointer transition-colors">Patient Search</span>
                    <span className="text-blue-400 text-sm font-medium border-b border-blue-400 pb-0.5">Staff Directory</span>
                    <span className="text-[#8892a4] text-sm hover:text-white cursor-pointer transition-colors">Reports</span>
                </div>
            </nav>

            {/* Content */}
            <div className="px-8 py-8 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Staff Directory</h1>
                    <p className="text-[#8892a4] text-sm mt-1">Search for staff by name, role or department</p>
                </div>
                <StaffDirectoryClient />
            </div>
        </main>
    )
}