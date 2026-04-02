import { StaffDirectoryClient } from "./StaffDirectoryClient"

export const metadata = {
    title: "Staff Directory | ER CareView",
    description: "Search for emergency department staff members",
}

export default function StaffDirectoryPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-[#1a2744] text-white w-full">
                <div className="px-8 py-8">
                    <p className="text-blue-300 text-sm font-medium tracking-wide uppercase mb-1">
                        ER CareView
                    </p>
                    <h1 className="text-3xl font-bold">Staff Directory</h1>
                    <p className="text-blue-200 mt-1 text-sm">
                        Search for staff by name, role or department
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="px-8 py-8 flex flex-col gap-6">
                <StaffDirectoryClient />
            </div>
        </main>
    )
}