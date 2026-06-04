'use client';

import { MDAInterface } from '@/libs/interface/mda/mdas.interface';

interface MdaItemProps {
  item: MDAInterface;
  onNavigate: (path: string) => void;
  className?: string;
  showUnderline?: boolean;
  variant?: 'default' | 'compact';
}

export function MdaItem({
  item,
  onNavigate,
  className = '',
  showUnderline = true,
  variant = 'default',
}: MdaItemProps) {
  const isCompact = variant === 'compact';

  //Params
  const id = item.id;
  const name = item.name;

  return (
    <button
      type="button"
      onClick={() => onNavigate(`/mda/${id}`)}
      className="
          text-left w-full
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
          hover:cursor-pointer
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
    </button>
  );
}
