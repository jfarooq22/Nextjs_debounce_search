import { z } from "zod"

export const staffMemberSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    department: z.string(),
    email: z.email(),
    phone: z.string(),
    availability: z.enum(["available", "busy", "off-duty"]),
})

export const staffSearchResponseSchema = z.object({
    results: z.array(staffMemberSchema),
    total: z.number(),
    query: z.string(),
})

// These are derived from the schema — types can never drift from validation
export type StaffMember = z.infer<typeof staffMemberSchema>
export type StaffSearchResponse = z.infer<typeof staffSearchResponseSchema>