'use client';

import { homeSections } from '@/libs/consts/home.const';
import { formatDate } from '@/libs/functions';
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
      onNavigate(homeSections.appointment.routes.detail(referenceNumber));
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
      {/* Reference + Date */}
      <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500">
        {item.reference_number && <span>{item.reference_number}</span>}

        {item.reference_number && item.appointment_date && <span>|</span>}

        {item.appointment_date && <span>{formatDate(item.appointment_date)}</span>}
      </div>

      {/* Title */}
      <h5
        className="
          mb-1 text-[18px] font-semibold uppercase text-[#1D70B8]
          group-hover:cursor-pointer
          group-hover:underline
          group-hover:underline-offset-4
          decoration-2 transition-colors
        "
      >
        {item.title}
      </h5>

      {/* MDA */}
      {item.mdas?.name && (
        <p className="mb-3 text-sm font-medium text-gray-700">{item.mdas.name}</p>
      )}

      {/* Description */}
      {item.description && (
        <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-600">{item.description}</p>
      )}

      {/* Appointees Count */}
      {item.linked_letter_ids?.length ? (
        <p className="text-sm font-medium">
          {item.linked_letter_ids.length} appointee
          {item.linked_letter_ids.length > 1 ? 's' : ''}
        </p>
      ) : null}
    </button>
  );
}
