import { ServicesInterface } from '@/libs/interface/service/services.interface';

interface PopularCategoryItemProps {
  item: ServicesInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showUnderline?: boolean;
  variant?: 'default' | 'compact';
}

export function PopularCategoryItem({
  item,
  onNavigate,
  className = '',
  showUnderline = true,
  variant = 'default',
}: PopularCategoryItemProps) {
  const isCompact = variant === 'compact';

  // Params
  const id = item.id;
  const name = item.name;
  const description = item.description;

  return (
    <button
      type="button"
      onClick={() => onNavigate(`/service/detail/${id}`)}
      className="
          text-left w-full
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
    >
      <h5
        className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[18px] sm:text-[20px] md:text-[22px]'}
        `}
      >
        {name}
      </h5>

      <p
        className={`
        leading-[1.58] text-[#505A5F]
        ${isCompact ? 'text-base' : 'text-[19px]'}
      `}
      >
        {description}
      </p>
    </button>
  );
}
