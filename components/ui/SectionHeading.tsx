'use client';

import { ArrowBigLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HeadingProps {
  title: ReactNode;
  description?: ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  descriptionClassName?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function SectionHeading({
  title,
  description,
  level = 'h2',
  className = '',
  descriptionClassName = '',
  showBack = false,
  onBack,
}: HeadingProps) {
  const Tag = level;

  const baseStyles = 'font-bold text-[#003366] tracking-tight mb-3 leading-tight';

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
              w-9 h-9 rounded-full
              border border-gray-200
              text-gray-600
              hover:bg-gray-100 hover:text-[#003366]
              transition
            "
            aria-label="Go back"
          >
            <ArrowBigLeftIcon className="text-sm" />
          </button>
        )}
        <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>{title}</Tag>
      </div>

      {description && (
        <p
          className={`
            text-[24px] text-gray-900
            mb-12
            ${descriptionClassName}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}
