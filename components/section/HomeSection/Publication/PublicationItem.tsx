import { PublicationInterface } from '@/libs/interface/publications.interface';

interface PublicationItemProps {
  item: PublicationInterface;
  onNavigate: (path: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
  showVerified?: boolean;
}

export function PublicationItem({
  item,
  onNavigate,
  className = '',
  showVerified = true,
  variant = 'default',
}: PublicationItemProps) {
  // Params
  const id = item.id;
  const title = item.title;
  const ministry_name = item.mdas?.name?.trim() || 'Government of Sierra Leone';
  const fileType = item.file_type;
  const isCompact = variant === 'compact';

  return (
    <div className={`group ${className}`}>
      <button
        type="button"
        onClick={() => onNavigate(`publication/${id}`)}
        className="
            w-full text-left
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
          {title}
        </h6>

        <div
          className="
    flex flex-wrap items-center gap-x-3 gap-y-1.5
    text-[15px] sm:text-[16px]
    text-[#505A5F]
  "
        >
          {ministry_name && <span>{ministry_name}</span>}
        </div>
      </button>

      <div
        className="
    flex flex-wrap items-center gap-x-3 gap-y-1.5
    text-[15px] sm:text-[16px]
    text-[#505A5F]
  "
      >
        {fileType && (
          <>
            <span className="uppercase">{fileType}</span>
            <span className="text-gray-400">•</span>
            Published
            <span className="text-gray-400">•</span>
          </>
        )}

        {showVerified && (
          <>
            <span className="inline-flex items-center gap-1 text-[#008A3C] font-medium">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          </>
        )}
      </div>
    </div>
  );
}
