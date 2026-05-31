import { AnnouncementTypeMappedInterface } from '@/libs/api/announcements.api';

interface AnnouncementItemProps {
  item: AnnouncementTypeMappedInterface;
  onNavigate: (path: string) => void;
  className?: string;
}

export function AnnouncementItem({ item, onNavigate, className = '' }: AnnouncementItemProps) {
  const type = item.announcement_type?.toLowerCase();

  const typeLabel =
    type === 'vacancy'
      ? 'Job Vacancies'
      : type === 'notice'
        ? 'Public Notices & Tenders'
        : type === 'event'
          ? 'Government Events'
          : 'All Announcements';

  const typeColor =
    type === 'vacancy'
      ? 'bg-blue-50 text-blue-700'
      : type === 'notice'
        ? 'bg-amber-50 text-amber-700'
        : type === 'event'
          ? 'bg-green-50 text-green-700'
          : 'bg-gray-100 text-gray-700';

  const handleClick = () => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (type && type !== 'all') {
      params.set('category', type);
    }

    onNavigate(`/announcement?${params.toString()}`);
  };

  return (
    <div className="h-full">
      <button
        type="button"
        onClick={handleClick}
        className={`
          group flex h-full w-full flex-col justify-between
          rounded-2xl border border-slate-200
          bg-white
          p-5 sm:p-6
          text-left
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#003366]/20
          hover:shadow-lg
          ${className}
        `}
      >
        {/* TYPE BADGE */}
        <span
          className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}
        >
          {typeLabel}
        </span>

        {/* TITLE */}
        <h3 className="mb-3 text-xl font-bold text-[#003366]">{item.title}</h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600">{item.description}</p>

        {/* COUNT */}
        <span className="mt-5 inline-flex w-fit rounded-full bg-[#F3F2F1] px-3 py-1 text-xs font-semibold text-[#003366]">
          {item.total} items
        </span>

        <span className="mt-4 text-sm font-medium text-[#003366] opacity-100">
          Browse category →
        </span>
      </button>
    </div>
  );
}
