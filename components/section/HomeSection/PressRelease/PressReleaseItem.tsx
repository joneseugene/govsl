import { markdownComponents } from '@/libs/consts/general.const';
import { formatDate } from '@/libs/functions';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import ReactMarkdown from 'react-markdown';

interface PressReleaseItemProps {
  item: PressReleaseInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showVerified?: boolean;
}

export function PressReleaseItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
}: PressReleaseItemProps) {
  // Params
  const id = item.id;
  const title = item.title ?? '';
  const description = item.description ?? '';
  const mda_name = item.mdas?.name ?? 'Unknown MDA';
  const date = item.date;

  return (
    <div className={`group ${className}`}>
      <div className="flex flex-wrap items-center gap-3 mb-3 text-[15px] sm:text-[16px] text-[#505A5F]">
        <span className="font-medium text-[#333]">{mda_name ?? 'Unknown Ministry'}</span>

        <span className="text-gray-400">•</span>

        <time>{formatDate(date)}</time>
      </div>

      {/* Clickable title */}
      <button
        type="button"
        onClick={() => onNavigate(`/press-release/${id}`)}
        className="
          text-left w-full
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D70B8]/50 rounded
        "
      >
        <h5
          className="
            text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
            text-[#1D70B8] group-hover:text-[#003366]
            group-hover:underline group-hover:underline-offset-4
            decoration-2 transition-colors
          "
        >
          {title}
        </h5>
      </button>

      {/* Excerpt – markdown supported */}
      <div className="mt-4 text-sm">
        <ReactMarkdown components={markdownComponents}>{description}</ReactMarkdown>
      </div>

      {/* Verified badge */}
      {showVerified && (
        <div className="mt-5 flex items-center gap-1.5 text-[15px] font-medium text-[#008A3C]">
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
