import { renderHook, act, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useStaffSearch } from "@/lib/hooks/useStaffSearch"
import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe("useStaffSearch", () => {
    beforeEach(() => {
        mockFetch.mockReset()
    })

    it("returns empty results and no loading state on initial render", () => {
        const { result } = renderHook(() => useStaffSearch(), {
            wrapper: createWrapper(),
        })

        expect(result.current.results).toEqual([])
        expect(result.current.isLoading).toBe(false)
        expect(result.current.searchTerm).toBe("")
    })

    it("updates searchTerm when setSearchTerm is called", () => {
        const { result } = renderHook(() => useStaffSearch(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.setSearchTerm("nurse")
        })

        expect(result.current.searchTerm).toBe("nurse")
    })

    it("fetches results after debounce when search term is set", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                results: [
                    {
                        id: "1",
                        firstName: "James",
                        lastName: "Nguyen",
                        role: "Triage Nurse",
                        department: "Emergency",
                        email: "j.nguyen@ercareview.com",
                        phone: "03 9000 0002",
                        availability: "busy",
                    },
                ],
                total: 1,
                query: "nurse",
            }),
        })

        const { result } = renderHook(() => useStaffSearch(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.setSearchTerm("nurse")
        })

        await waitFor(
            () => expect(result.current.results).toHaveLength(1),
            { timeout: 1000 }
        )

        expect(mockFetch).toHaveBeenCalledWith(
            "/api/staff?search=nurse"
        )
        expect(result.current.results[0].firstName).toBe("James")
    })

    it("sets isError when fetch fails", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
        })

        const { result } = renderHook(() => useStaffSearch(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.setSearchTerm("nurse")
        })

        await waitFor(
            () => expect(result.current.isError).toBe(true),
            { timeout: 1000 }
        )
    })
})