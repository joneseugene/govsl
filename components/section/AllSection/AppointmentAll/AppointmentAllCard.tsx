'use client';

import { homeSections } from '@/libs/consts/home.const';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';

interface AppointmentNoticeCardProps {
  item: AppointmentInterface;
  onNavigate: (path: string) => void;
  className?: string;
  useHomeSections?: boolean;
}

export function AppointmentNoticeCard({
  item,
  onNavigate,
  className = '',
  useHomeSections = true,
}: AppointmentNoticeCardProps) {
  const handleClick = () => {
    const referenceNumber = item.reference_number;

    if (!referenceNumber) return;

    if (useHomeSections) {
      onNavigate(
        homeSections.appointment.routes.detail(referenceNumber)
      );
      return;
    }

    onNavigate(`/appointment/${referenceNumber}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        group relative overflow-hidden text-left
        focus:outline-none
        ${className}
      `}
    >
      {/* Reference Number */}
      <div
        className="
          flex flex-wrap items-center
          gap-3 text-sm sm:text-[15px]
          text-slate-500
        "
      >
        <span
          className="
            font-medium text-[#1D70B8]
            group-hover:cursor-pointer
            group-hover:underline
            group-hover:underline-offset-4
            transition-colors
          "
        >
          {item.reference_number || 'Appointment Notice'}
        </span>
      </div>

      {/* Verified */}
      <div
        className="
          mt-1 flex items-center gap-2
          text-sm font-medium text-[#008A3C]
        "
      >
        <div className="h-2 w-2 rounded-full bg-[#008A3C]" />
        Official & Verified
      </div>
    </button>
  );
}