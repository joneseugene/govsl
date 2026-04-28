import { formatDate } from '@/libs/functions';
import { PublicationInterface } from '@/libs/interface/publications.interface';

interface PublicationItemProps {
  item: PublicationInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showVerified?: boolean;
}

export function PublicationItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
}: PublicationItemProps) {
  // Params
  const id = item.id;
  const title = item.title;
  const ministry_name = item.mdas?.name;
  const date = item?.date;

  return (
    <div className={`group ${className}`}>
      <button
        type="button"
        onClick={() => onNavigate(`publication-${id}`)}
        className="
            w-full text-left
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-[#1D70B8]/50 rounded
            "
      >
        <h5
          className="
                            text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                            leading-tight
                            font-semibold
                            text-[#1D70B8] group-hover:text-[#003366]
                            group-hover:underline group-hover:underline-offset-4
                            decoration-2 transition-colors
                            mb-3
                        "
        >
          {title}
        </h5>

        <div
          className="
    flex flex-wrap items-center gap-x-3 gap-y-1.5
    text-[15px] sm:text-[16px]
    text-[#505A5F]
  "
        >
          {ministry_name && <span className="font-medium text-[#333]">{ministry_name}</span>}

          {ministry_name && date && <span className="text-gray-400 hidden sm:inline">•</span>}

          {date && <time>Published {formatDate(date)}</time>}
        </div>
      </button>

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
