import { formatDate } from '@/libs/functions';
import ReactMarkdown from 'react-markdown';
import { AnnouncementInterface } from '@/libs/interface/announcements.interface';
import { markdownComponents } from '@/libs/consts/general.const';

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
        className="
          text-left w-full
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
      >
        {/* META */}
        <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          {/* TYPE */}
          {item.announcement_type && <span className="font-medium">{typeLabel}</span>}

          {/* DIVIDER */}
          {(item.announcement_type || item.mdas?.name) && item.date && <span>|</span>}

          {/* DATE */}
          {item.date && <span>{formatDate(item.date)}</span>}
        </div>

        {/* TITLE */}
        <h5
          className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
        `}
        >
          {title}
        </h5>

        {/* DESCRIPTION */}
        <p className="mb-4 text-sm text-gray-700">
          <ReactMarkdown components={markdownComponents}>{description}</ReactMarkdown>
        </p>
      </button>
    </div>
  );
}
