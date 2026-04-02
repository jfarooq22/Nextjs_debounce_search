import { StaffCard } from "@/components/staff/StaffCard"
import type { StaffMember } from "@/lib/schemas/staff"

interface StaffGridProps {
    results: StaffMember[]
    total: number
    isLoading: boolean
    isError: boolean
    searchTerm: string
}

// Loading skeleton for a single card
function StaffCardSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 animate-pulse"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
            <div className="h-3 w-28 bg-gray-200 rounded" />
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-2">
                <div className="h-3 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
        </div>
    )
}

export function StaffGrid({
    results,
    total,
    isLoading,
    isError,
    searchTerm,
}: StaffGridProps) {

    // Loading state
    if (isLoading) {
        return (
            <section aria-label="Loading staff results">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    aria-busy="true"
                >
                    {Array.from({ length: 3 }).map((_, i) => (
                        <StaffCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        )
    }

    // Error state
    if (isError) {
        return (
            <section aria-label="Search error">
                <div
                    role="alert"
                    className="flex flex-col items-center justify-center py-16 text-center"
                >
                    <p className="text-lg font-medium text-gray-900">
                        Something went wrong
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Unable to fetch staff members. Please try again.
                    </p>
                </div>
            </section>
        )
    }

    // Empty search state - nothing typed yet
    if (searchTerm.length === 0) {
        return (
            <section aria-label="Staff search prompt">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-gray-900">
                        Search for staff members
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Search by name, role or department
                    </p>
                </div>
            </section>
        )
    }

    // // Empty search state - nothing typed yet
    // if (searchTerm.length === 0) {
    //     return (
    //         <section aria-label="Staff search prompt">
    //             <div className="flex flex-col items-center justify-center py-16 text-center">
    //                 <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
    //                     <svg
    //                         aria-hidden="true"
    //                         className="w-8 h-8 text-blue-400"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         viewBox="0 0 24 24"
    //                     >
    //                         <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={1.5}
    //                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    //                         />
    //                     </svg>
    //                 </div>
    //                 <p className="text-lg font-medium text-gray-900">
    //                     Search for staff members
    //                 </p>
    //                 <p className="text-sm text-gray-500 mt-1">
    //                     Search by name, role or department
    //                 </p>
    //             </div>
    //         </section>
    //     )
    // }

    // No results state
    if (results.length === 0) {
        return (
            <section aria-label="No results found">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-gray-900">
                        No staff found for &ldquo;{searchTerm}&rdquo;
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Try a different name, role or department
                    </p>
                </div>
            </section>
        )
    }

    // Results state
    return (
        <section aria-label={`Search results for ${searchTerm}`}>
            <p className="text-sm text-gray-500 mb-4">
                Showing {total} {total === 1 ? "result" : "results"} for &ldquo;{searchTerm}&rdquo;
            </p>
            <div
                id="search-results"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {results.map((member) => (
                    <StaffCard key={member.id} member={member} />
                ))}
            </div>
        </section>
    )
}