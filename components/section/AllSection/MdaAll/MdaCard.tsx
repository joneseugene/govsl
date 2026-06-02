// MDACard.tsx
'use client';
import React from 'react';

interface MDACardProps {
  name: string;
  onViewClick: () => void;
}

export const MDACard: React.FC<MDACardProps> = ({ name, onViewClick }) => {
  return (
    <div
      className="
        flex h-full flex-col"
    >
      {/* Content */}
      <div className="
          text-left w-full
          mb-3
          hover:cursor-pointer
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        ">
        <h5 
        onClick={onViewClick}
        className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
        `}>
          {name}
        </h5>
      </div>

    </div>
  );
};
