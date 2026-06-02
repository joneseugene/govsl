'use client';

import { ArrowBigLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HeadingProps {
  title: ReactNode;
  description?: ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  descriptionClassName?: string;
  descriptionSizeClassName?: string;
  showBack?: boolean;
  onBack?: () => void;

  fontWeight?:
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-semibold'
    | 'font-bold'
    | 'font-extrabold';
}

export function SectionHeading({
  title,
  description,
  level = 'h2',
  className = '',
  descriptionClassName = '',
  descriptionSizeClassName = '',
  fontWeight = 'font-bold',
  showBack = false,
  onBack,
}: HeadingProps) {
  const Tag = level;

  const baseStyles = `text-[#003366] tracking-tight mb-3 leading-tight ${fontWeight}`;

  const sizeStyles = {
    h1: 'text-4xl sm:text-[42px]',
    h2: 'text-4xl sm:text-[42px]',
    h3: 'text-3xl sm:text-4xl',
    h4: 'text-2xl sm:text-3xl',
    h5: 'text-xl sm:text-2xl',
    h6: 'text-lg sm:text-xl',
  };

  return (
    <div className="mb-1">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-2">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="
              flex items-center justify-center
              w-9 h-9
              hover:bg-gray-100 hover:text-[#003366]
              hover:cursor-pointer
              transition
            "
            aria-label="Go back"
          >
            <ArrowBigLeftIcon className="text-sm text-[#003366]" />
          </button>
        )}
        <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>{title}</Tag>
      </div>

      {description && (
        <p
          className={`
            mb-12
            ${descriptionSizeClassName || 'text-[24px]'}
            ${descriptionClassName || 'text-gray-900'}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}
