'use client';

import { AppointmentSummaryInterface } from '@/libs/interface/appointments.interface';
import { formatDate } from '../../../../libs/functions';
import { ArrowRight } from 'lucide-react';

interface AppointmentItemProps {
  item: AppointmentSummaryInterface;
  onNavigate: (path: string) => void;
  className?: string;
}

export function AppointmentItem({ item, onNavigate, className = '' }: AppointmentItemProps) {
  const date = item.appointment_date;
  const total = item.total_appointments;

  return (
    <button
      type="button"
      onClick={() => onNavigate(`/appointment?date=${encodeURIComponent(date)}`)}
      className={`
        group relative overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-6 sm:p-7
        text-left shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#003366]/20
        hover:shadow-xl
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1D70B8]/40
        ${className}
      `}
    >
      {/* Accent line */}
      <div
        className="
          absolute left-0 top-0 h-full w-1
          bg-[#003366]
          transition-all duration-300
          group-hover:bg-[#008A3C]
        "
      />

      {/* Top Meta */}
      <div
        className="
          mb-5 flex flex-wrap items-center
          gap-3 text-sm sm:text-[15px]
          text-slate-500
        "
      >
        <span
          className="
            rounded-full bg-slate-100
            px-3 py-1
            font-medium text-slate-700
          "
        >
          Appointment Notice
        </span>

        <span className="text-slate-300">•</span>

        <time className="font-medium text-slate-600">{formatDate(date)}</time>
      </div>

      {/* Main Title */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="
              text-[24px] leading-tight
              font-bold tracking-tight
              text-[#003366]
              transition-colors duration-300
              group-hover:text-[#1D70B8]
            "
          >
            {total} Official Appointment
            {total > 1 ? 's' : ''}
          </h3>

          <p
            className="
              mt-3 max-w-2xl
              text-[15px] leading-relaxed
              text-slate-600
            "
          >
            Published government appointment notices and official public service designations for
            this date.
          </p>
        </div>

        {/* Arrow */}
        <div
          className="
            hidden sm:flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full border border-slate-200
            bg-slate-50 text-slate-500
            transition-all duration-300
            group-hover:border-[#1D70B8]
            group-hover:bg-[#1D70B8]
            group-hover:text-white
          "
        >
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          mt-6 flex items-center gap-2
          text-sm font-medium text-[#008A3C]
        "
      >
        <div className="h-2 w-2 rounded-full bg-[#008A3C]" />
        Official & Verified
      </div>
    </button>
  );
}
