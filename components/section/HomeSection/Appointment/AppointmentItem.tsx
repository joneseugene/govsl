'use client';

import { homeSections } from '@/libs/consts/home.const';
import { formatDate } from '@/libs/functions';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';

interface AppointmentItemProps {
  item: AppointmentInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showVerified?: boolean;
  variant?: 'default' | 'compact';
  useHomeSections?: boolean;
}

export function AppointmentItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
  variant = 'default',
  useHomeSections = true,
}: AppointmentItemProps) {
  const isCompact = variant === 'compact';

  const handleClick = () => {
  const referenceNumber = item.reference_number;

  if (!referenceNumber) return;

  if (useHomeSections) {
    onNavigate(homeSections.appointment.routes.detail(referenceNumber));
    return;
  }

  onNavigate(`/appointment/${referenceNumber}`);
};

  return (
    <div className={`group mb-5 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className="
          w-full rounded text-left
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50
        "
      >
        <h5
          className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[18px] sm:text-[20px] md:text-[22px]'}
        `}
        >
          {item.reference_number || 'Appointment Notice'}
        </h5>
      </button>


      {showVerified && (
        <div
          className={`
            mt-4 flex items-center gap-1.5
            font-medium text-[#008A3C]
            ${isCompact ? 'text-sm' : 'text-[15px]'}
          `}
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