import { AnnouncementInterface } from '@/libs/interface/announcements.interface';

interface MoreItemProps {
  item: AnnouncementInterface;
  onNavigate: (path: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export function MoreItem({ item, onNavigate, className = '', variant = 'default' }: MoreItemProps) {
  const isCompact = variant === 'compact';

  const title = item.title;
  const description = item.description;

  return (
    <div className="h-full">
      <button
        type="button"
        onClick={() => onNavigate(`/publication/${item.id}`)}
        className={`
          group w-full h-full text-left
          rounded-2xl
          bg-white
          transition-all duration-300 ease-out
          flex flex-col justify-between
          
          /* spacing */
          p-4 sm:p-5 md:p-6
          
          /* hover */
          hover:shadow-md hover:-translate-y-0.5
          
          ${className}
        `}
      >
        {/* TITLE */}
        <h6
          className={`
            font-semibold
            text-[#003366]
            leading-tight
            transition-colors duration-200

            /* responsive typography */
            text-base sm:text-lg md:text-xl lg:text-[21px]

            /* spacing */
            mb-2 sm:mb-3 md:mb-4

            /* truncate long titles nicely */
            line-clamp-2
          `}
        >
          {title}
        </h6>

        {/* DESCRIPTION */}
        <p
          className={`
            text-gray-600
            leading-relaxed

            /* responsive text */
            text-sm sm:text-base md:text-[15px]

            /* spacing */
            mb-2 sm:mb-3

            /* clamp for consistency */
            line-clamp-3
          `}
        >
          {description}
        </p>

        {/* OPTIONAL CTA (helps UX) */}
        <span
          className="
            text-sm font-medium text-[#003366]
            mt-auto
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
        >
          View details →
        </span>
      </button>
    </div>
  );
}
