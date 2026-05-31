import { homeSections } from '@/libs/consts/home.const';
import { formatDate } from '@/libs/functions';
import { NewsArticleInterface } from '@/libs/interface/news.articles.interface';

interface NewsItemProps {
  item: NewsArticleInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showVerified?: boolean;
  variant?: 'default' | 'compact';
  useHomeSections?: boolean;
}

export function NewsItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
  variant = 'default',
  useHomeSections = true,
}: NewsItemProps) {
  const isCompact = variant === 'compact';

  // Params
  const id = item.id;
  const mda_name = item.mdas?.name;
  const date = item.date;
  const headline = item.headline;

  const handleClick = () => {
    if (useHomeSections) {
      onNavigate(homeSections.news.routes.detail(id));
    } else {
      onNavigate(`news-${id}`);
    }
  };

  return (
    <div className={`group ${className}`}>
      {/* Meta line */}
      <div
        className={`
            flex flex-wrap items-center gap-3
            text-gray-600 mb-3
            ${isCompact ? 'text-sm' : 'text-[15px] sm:text-[16px]'}
            `}
      >
        <span className="text-gray-600">{mda_name ?? 'Unknown Ministry'}</span>
        {date && (
          <>
            <span className="text-gray-600">|</span>
            <time>{formatDate(date)}</time>
          </>
        )}
      </div>

      {/* Clickable headline */}
      <button
        type="button"
        onClick={handleClick}
        className="
          text-left w-full
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
      >
        <h6
          className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[18px] sm:text-[20px] md:text-[22px]'}
        `}
        >
          {headline}
        </h6>
      </button>

      {/* Verified trust signal */}
      {showVerified && (
        <div
          className={`
                    mt-4 flex items-center gap-1.5
                    font-medium text-[#008A3C]
                    ${isCompact ? 'text-sm' : 'text-[15px]'}
                `}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified
        </div>
      )}
    </div>
  );
}
