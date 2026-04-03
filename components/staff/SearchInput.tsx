"use client"

import { useRef } from "react"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    isLoading: boolean
    resultCount: number
}

export function SearchInput({ value, onChange, isLoading, resultCount }: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="relative w-full">
            <label
                htmlFor="staff-search"
                className="block text-sm font-medium text-[#8892a4] mb-1"
            >
                Search Staff Directory
            </label>

            <div className="relative">
                <input
                    ref={inputRef}
                    id="staff-search"
                    type="search"
                    role="searchbox"
                    aria-label="Search staff by name, role or department"
                    aria-busy={isLoading}
                    aria-controls="search-results"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search by name, role or department..."
                    className="w-full px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-[#8892a4] border border-[#1e2d40]"
                    style={{ backgroundColor: "#161b27" }}
                />

                {isLoading && (
                    <div
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                    >
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Live region - screen readers announce result count changes */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {value.length > 0 && !isLoading && (
                    `${resultCount} ${resultCount === 1 ? "result" : "results"} found for ${value}`
                )}
            </div>
        </div>
    )
}