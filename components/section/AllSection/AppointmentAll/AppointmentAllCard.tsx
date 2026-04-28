'use client'

import { useRouter } from "next/navigation"


export interface AppointmentNoticeCardProps {
    id: string
    category?: string | null
    office: string
    date: string
    recipientName: string
    title: string | null
    excerpt?: string
    onReadMore: (id: string) => void
}

export function AppointmentNoticeCard({
    id,
    category,
    office,
    date,
    recipientName,
    title,
    excerpt,
    onReadMore,
}: AppointmentNoticeCardProps) {
    const router = useRouter()
    return (
        <div
            className="
        group cursor-pointer bg-white
        border-l-4 border-[#003366]
        p-6 sm:p-8
        transition-all duration-200
        hover:bg-slate-50 hover:border-[#008A3C]
      "
        >
            {/* Meta */}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                {category && (
                    <span className="
            rounded-sm bg-slate-100 px-3 py-1
            text-xs font-bold uppercase text-[#003366]
          ">
                        {category}
                    </span>
                )}
                <span>
                    {office} • {date}
                </span>
            </div>

            {/* Appointee */}
            <h2 className="mb-1 text-xl sm:text-2xl font-bold text-[#003366]">
                {recipientName}
            </h2>

            {/* Title / Position */}
            <div className="mb-3 text-base font-semibold text-slate-900">
                {title}
            </div>

            {/* Excerpt */}
            {excerpt && (
                <p className="mb-4 text-sm sm:text-base text-slate-800 leading-relaxed">
                    {excerpt}
                </p>
            )}

            {/* CTA */}
            <button
                onClick={() => router.push(`/appointment/${id}`)}
                className="mt-4 px-4 py-2 bg-blue-950 text-white text-sm rounded hover:bg-blue-800 transition"
            >
                Open
            </button>
        </div>
    )
}
