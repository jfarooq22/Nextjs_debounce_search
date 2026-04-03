"use client"

import type { StaffMember } from "@/lib/schemas/staff"

interface StaffCardProps {
    member: StaffMember
}

const availabilityConfig = {
    available: {
        label: "Available",
        className: "bg-green-100 text-green-800",
    },
    busy: {
        label: "Busy",
        className: "bg-amber-100 text-amber-800",
    },
    "off-duty": {
        label: "Off Duty",
        className: "bg-gray-100 text-gray-600",
    },
}

function getInitials(firstName: string, lastName: string): string {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

export function StaffCard({ member }: StaffCardProps) {
    const availability = availabilityConfig[member.availability]
    const initials = getInitials(member.firstName, member.lastName)

    return (
        <article
            aria-label={`${member.firstName} ${member.lastName}, ${member.role}`}
            className="rounded-xl border border-[#1e2d40] p-5 flex flex-col gap-4 hover:border-blue-500 transition-all duration-200"
            style={{ backgroundColor: "#161b27" }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                        aria-hidden="true"
                        className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0"
                    >
                        {initials}
                    </div>

                    {/* Name and role */}
                    <div>
                        <h3 className="font-semibold text-white leading-tight">
                            {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-sm text-[#8892a4] mt-0.5">{member.role}</p>
                    </div>
                </div>

                {/* Availability badge */}
                <span
                    aria-label={`Status: ${availability.label}`}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${availability.className}`}
                >
                    {availability.label}
                </span>
            </div>

            {/* Department */}
            <div className="flex items-center gap-2 text-sm text-[#8892a4]">
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-[#8892a4] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
                {member.department}
            </div>

            {/* Divider */}
            <hr className="border-[#1e2d40]" />

        {/* Contact info */}
        <div className="flex flex-col gap-2">
            <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.firstName} at ${member.email}`}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                {member.email}
            </a>
            <a
                href={`tel:${member.phone}`}
                aria-label={`Call ${member.firstName} at ${member.phone}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
                <svg
                    aria-hidden="true"
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
            </svg>
            {member.phone}
        </a>
      </div >
    </article >
  )
}