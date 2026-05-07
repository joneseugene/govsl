// MDACard.tsx
'use client';
import React from 'react';

interface MDACardProps {
  name: string;
  acronym: string;
  type: string;
  onViewClick: () => void;
}

export const MDACard: React.FC<MDACardProps> = ({ name, acronym, type, onViewClick }) => {
  return (
    <div
      className="
        flex h-full flex-col
        border border-gray-200 bg-white p-4
        rounded-lg shadow-sm
        hover:shadow-md hover:border-blue-500
        transition-all duration-200
      "
    >
      {/* Content */}
      <div className="text-left flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-[#003366] line-clamp-2 min-h-12">
          {name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-800">
            {acronym}
          </span>

          <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
            {type}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onViewClick}
        className="
          mt-4 flex items-center justify-center gap-2
          w-full px-4 py-2.5
          bg-blue-950 text-white text-sm font-medium
          rounded-lg
          transition-all duration-200
          hover:bg-blue-800 hover:shadow-md hover:cursor-pointer
          active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        See more
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
};
