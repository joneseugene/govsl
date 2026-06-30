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
        <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500">
          {item.reference_number && <span>{item.reference_number}</span>}

          {item.reference_number && item.appointment_date && <span>|</span>}

          {item.appointment_date && <span>{formatDate(item.appointment_date)}</span>}
        </div>

        <h5
          className={`
          mb-1 font-semibold uppercase text-[#1D70B8]
          group-hover:cursor-pointer group-hover:underline
          group-hover:underline-offset-4 decoration-2 transition-colors
          ${isCompact ? 'text-base' : 'text-[18px] sm:text-[20px]'}
        `}
        >
          {item.title}
        </h5>

        {item.mdas?.name && (
          <p className="mb-3 text-sm font-medium text-gray-700">{item.mdas.name}</p>
        )}

        {item.description && (
          <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-600">{item.description}</p>
        )}

        {item.linked_letter_ids?.length ? (
          <p className="mt-3 text-sm font-medium">
            {item.linked_letter_ids.length} appointee
            {item.linked_letter_ids.length > 1 ? 's' : ''}
          </p>
        ) : null}
      </button>
    </div>
  );
}
