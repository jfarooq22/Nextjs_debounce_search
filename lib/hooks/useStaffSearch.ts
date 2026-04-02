import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebounce } from "./useDebounce"
import type { StaffSearchResponse } from "@/lib/schemas/staff"

async function fetchStaff(query: string): Promise<StaffSearchResponse> {
    const response = await fetch(`/api/staff?search=${encodeURIComponent(query)}`)

    if (!response.ok) {
        throw new Error("Failed to fetch staff members")
    }

    return response.json()
}

export function useStaffSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearch = useDebounce(searchTerm, 300)

    const query = useQuery({
        queryKey: ["staff", debouncedSearch],
        queryFn: () => fetchStaff(debouncedSearch),
        enabled: debouncedSearch.length > 0,
        placeholderData: (previousData) => previousData,
    })

    return {
        searchTerm,
        setSearchTerm,
        results: query.data?.results ?? [],
        total: query.data?.total ?? 0,
        isLoading: query.isFetching,
        isError: query.isError,
        error: query.error,
    }
}