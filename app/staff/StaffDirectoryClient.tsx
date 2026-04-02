"use client"

import { SearchInput } from "@/components/staff/SearchInput"
import { StaffGrid } from "@/components/staff/StaffGrid"
import { useStaffSearch } from "@/lib/hooks/useStaffSearch"

export function StaffDirectoryClient() {
    const {
        searchTerm,
        setSearchTerm,
        results,
        total,
        isLoading,
        isError,
    } = useStaffSearch()

    return (
        <div className="flex flex-col gap-6">
            <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                isLoading={isLoading}
                resultCount={total}
            />
            <StaffGrid
                results={results}
                total={total}
                isLoading={isLoading}
                isError={isError}
                searchTerm={searchTerm}
            />
        </div>
    )
}