import { formatDate } from '@/libs/functions';
import { AnnouncementInterface } from '@/libs/interface/announcements.interface';

interface AnnouncementCardProps {
  item: AnnouncementInterface;
  onNavigate: (path: string) => void;
  className?: string;
}

export function AnnouncementCard({ item, onNavigate, className = '' }: AnnouncementCardProps) {
  const title = item.title || 'Untitled Announcement';

  const description = item.description || 'No description available';

  const type = item.announcement_type?.toLowerCase();

  const typeLabel =
    type === 'vacancy'
      ? 'Job Vacancy'
      : type === 'notice'
        ? 'Public Notice'
        : type === 'event'
          ? 'Government Event'
          : 'Announcement';

  const typeColor =
    type === 'vacancy'
      ? 'bg-blue-50 text-blue-700'
      : type === 'notice'
        ? 'bg-amber-50 text-amber-700'
        : type === 'event'
          ? 'bg-green-50 text-green-700'
          : 'bg-gray-100 text-gray-700';

  return (
    <div className="h-full">
      <button
        type="button"
        onClick={() => onNavigate(`/announcement/${item.id}`)}
        className={`
          group flex h-full w-full flex-col justify-between
          rounded-2xl bg-white
          p-4 sm:p-5 md:p-6
          text-left
          transition-all duration-300 ease-out
          hover:-translate-y-0.5 hover:shadow-md
          ${className}
        `}
      >
        {/* META */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* TYPE BADGE */}
          {item.announcement_type && (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}>
              {typeLabel}
            </span>
          )}

          {/* MDA */}
          {item.mdas?.name && (
            <span className="rounded-full bg-[#F3F2F1] px-3 py-1 text-xs font-medium text-[#003366]">
              {item.mdas.name}
            </span>
          )}

          {/* DATE */}
          {item.date && <span className="text-sm text-gray-500">{formatDate(item.date)}</span>}
        </div>

        {/* TITLE */}
        <h3
          className="
            mb-3
            line-clamp-2
            text-base font-semibold leading-tight text-[#003366]
            transition-colors duration-200
            sm:text-lg
            md:text-xl
            lg:text-[21px]
          "
        >
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mb-4
            line-clamp-3
            text-sm leading-relaxed text-gray-600
            sm:text-base
            md:text-[15px]
          "
        >
          {description}
        </p>

        {/* CTA */}
        <span
          className="
            mt-auto
            text-sm font-medium text-[#003366]
            opacity-100
            transition-opacity duration-200
            hover:cursor-pointer
          "
        >
          View announcement →
        </span>
      </button>
    </div>
  );
}
