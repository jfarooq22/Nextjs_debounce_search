import { NextRequest, NextResponse } from "next/server"
import { mockStaff } from "@/lib/mock-data/staff"
import { staffSearchResponseSchema } from "@/lib/schemas/staff"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("search") ?? ""

    // Simulate network latency so loading states are visible
    await new Promise((resolve) => setTimeout(resolve, 300))

    const filtered = query.length === 0
        ? []
        : mockStaff.filter((member) => {
            const search = query.toLowerCase()
            return (
                member.firstName.toLowerCase().includes(search) ||
                member.lastName.toLowerCase().includes(search) ||
                member.role.toLowerCase().includes(search) ||
                member.department.toLowerCase().includes(search)
            )
        })

    const response = staffSearchResponseSchema.parse({
        results: filtered,
        total: filtered.length,
        query,
    })

    return NextResponse.json(response)
}

