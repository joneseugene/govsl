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
      className={`
        group block w-full text-left
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#003366]/50 focus-visible:ring-offset-2
        rounded-lg transition-colors
        ${className}
      `}
    >
      <h5
        className={`
          text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
          text-[#003366] group-hover:text-[#003366]
          ${showUnderline ? 'group-hover:underline group-hover:underline-offset-[6px]' : ''}
          decoration-2 decoration-[#003366]/40
          leading-tight
          mb-3
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[20px] sm:text-[18px]'}
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
