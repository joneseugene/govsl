import { formatDate } from "../../../../libs/functions"

interface AppointmentItemProps {
    appointment: {
        id: string | number
        office: string
        date: string
        recipientName: string
        title?: string | null
    }
    onNavigate: (path: string) => void
    className?: string
    showVerified?: boolean
}

export function AppointmentItem({
    appointment,
    onNavigate,
    className = '',
    showVerified = true
}: AppointmentItemProps) {
    return (
        <div className={`group ${className}`}>
            {/* Meta line */}
            <div className="
                flex flex-wrap items-center gap-3
                text-[15px] sm:text-[16px]
                text-[#505A5F] mb-3
            ">
                <span className="font-medium text-[#333]">
                    {appointment.office}
                </span>
                <span className="text-gray-400">•</span>
                <time>{formatDate(appointment.date)}</time>
            </div>

            {/* Clickable title line */}
            <button
                type="button"
                onClick={() => onNavigate(`appointment-${appointment.id}`)}
                className="
                    text-left w-full
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-[#1D70B8]/50 rounded
                "
            >
                <h6 className="
                    text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                    font-semibold
                    text-[#1D70B8] group-hover:text-[#003366]
                    group-hover:underline group-hover:underline-offset-4
                    decoration-2 transition-colors
                ">
                    {appointment.recipientName} — {appointment.title}
                </h6>
            </button>

            {/* Verified trust signal */}
            {showVerified && (
                <div className="
                    mt-4 flex items-center gap-1.5
                    text-[15px] font-medium text-[#008A3C]
                ">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Official & Verified
                </div>
            )}
        </div>
    )
}