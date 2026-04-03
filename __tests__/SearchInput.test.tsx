import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchInput } from "@/components/staff/SearchInput"
import { describe, it, expect, vi } from "vitest"

describe("SearchInput", () => {
    it("renders the search input with correct label", () => {
        render(
            <SearchInput
                value=""
                onChange={vi.fn()}
                isLoading={false}
                resultCount={0}
            />
        )

        expect(
            screen.getByLabelText("Search staff by name, role or department")
        ).toBeInTheDocument()
    })

    it("calls onChange when user types", async () => {
        const user = userEvent.setup()
        const handleChange = vi.fn()

        render(
            <SearchInput
                value=""
                onChange={handleChange}
                isLoading={false}
                resultCount={0}
            />
        )

        const input = screen.getByRole("searchbox")
        await user.type(input, "nurse")

        expect(handleChange).toHaveBeenCalled()
    })

    it("shows loading spinner when isLoading is true", () => {
        render(
            <SearchInput
                value="nurse"
                onChange={vi.fn()}
                isLoading={true}
                resultCount={0}
            />
        )

        // Spinner is aria-hidden but we can check it exists in the DOM
        const spinner = document.querySelector(".animate-spin")
        expect(spinner).toBeInTheDocument()
    })

    it("announces result count to screen readers", () => {
        render(
            <SearchInput
                value="nurse"
                onChange={vi.fn()}
                isLoading={false}
                resultCount={3}
            />
        )

        const liveRegion = screen.getByRole("status")
        expect(liveRegion).toHaveTextContent("3 results found for nurse")
    })
})