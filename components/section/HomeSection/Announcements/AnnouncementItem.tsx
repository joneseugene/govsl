import { AnnouncementTypeMappedInterface } from '@/libs/api/announcements.api';

interface AnnouncementItemProps {
  item: AnnouncementTypeMappedInterface;
  onNavigate: (path: string) => void;
  className?: string;
}

export function AnnouncementItem({ item, onNavigate, className = '' }: AnnouncementItemProps) {
  const type = item.announcement_type?.toLowerCase();

  const handleClick = () => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (type && type !== 'all') {
      params.set('category', type);
    }

    onNavigate(`/announcements?${params.toString()}`);
  };

  return (
    <div className="h-full mt-5">
      <button
        type="button"
        onClick={handleClick}
        className={`
          group flex h-full w-full flex-col justify-between
          border border-slate-50
          bg-white
          text-left
          ${className}
        `}
      >
        {/* TITLE */}
        <h5 className="mb-3 text-xl font-bold text-[#1D70B8] group-hover:cursor-pointer">
          {item.title}
        </h5>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600">{item.description}</p>

        {/* COUNT */}
        <span className="mt-5 inline-flex w-fit rounded-full bg-[#F3F2F1] px-3 py-1 text-xs font-semibold text-[#003366]">
          {item.total} items
        </span>
      </button>
    </div>
  );
}
