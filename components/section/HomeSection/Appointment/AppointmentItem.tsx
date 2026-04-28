import { AppointmentInterface } from '@/libs/interface/appointments.interface';
import { formatDate } from '../../../../libs/functions';

interface AppointmentItemProps {
  item: AppointmentInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showVerified?: boolean;
}

export function AppointmentItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
}: AppointmentItemProps) {
  // Params
  const id = item.id;
  const date = item.appointment_date;
  const title = item.title;
  const appointee_name = item.appointee_name;
  const office_name = item.office_name;

  return (
    <div className={`group ${className}`}>
      {/* Meta line */}
      <div
        className="
                flex flex-wrap items-center gap-3
                text-[15px] sm:text-[16px]
                text-[#505A5F] mb-3
            "
      >
        <span className="font-medium text-[#333]">{office_name}</span>
        <span className="text-gray-400">•</span>
        <time>{formatDate(date)}</time>
      </div>

      {/* Clickable title line */}
      <button
        type="button"
        onClick={() => onNavigate(`appointment-${id}`)}
        className="
                    text-left w-full
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-[#1D70B8]/50 rounded
                "
      >
        <h6
          className="
                    text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                    font-semibold
                    text-[#1D70B8] group-hover:text-[#003366]
                    group-hover:underline group-hover:underline-offset-4
                    decoration-2 transition-colors
                "
        >
          {appointee_name} — {title}
        </h6>
      </button>

      {/* Verified trust signal */}
      {showVerified && (
        <div
          className="
                    mt-4 flex items-center gap-1.5
                    text-[15px] font-medium text-[#008A3C]
                "
        >
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
  );
}
