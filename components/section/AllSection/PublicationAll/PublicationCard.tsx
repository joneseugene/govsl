'use client';

import { formatDate } from '@/libs/functions';
import { useState, useEffect } from 'react';

interface PublicationCardProps {
  id: string;
  title: string;
  ministry: string;
  date?: string;
  file_size?: string;
  category?: string;
  description?: string;
  onReadMore: (id: string) => void;
}

export function PublicationCard({
  id,
  title,
  ministry,
  date,
  file_size,
  category,
  description,
  onReadMore,
}: PublicationCardProps) {
  const [showFull, setShowFull] = useState(false);
  const [mounted, setMounted] = useState(false);

  const snippet = description ? description.slice(0, 120) : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render fallback to match server HTML
    return (
      <article className="group">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">
          {ministry} • {formatDate(date)}
        </p>
      </article>
    );
  }

  return (
    <article className="group">
      <div
        className={`
            flex flex-wrap items-center gap-3
            text-gray-600 mb-1
            `}
      >
        <span className="text-gray-600">{ministry}</span>
        {date && (
          <>
            <span className="text-gray-600">|</span>
            <time>{formatDate(date)}</time>
          </>
        )}
      </div>
      {/* Title */}
      <h5
        onClick={() => onReadMore(id)}
        className={`font-medium
                text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                text-[#1D70B8] group-hover:cursor-pointer
                group-hover:underline group-hover:underline-offset-4
                decoration-2 transition-colors mb-5
                `}
      >
        {title}
      </h5>

    </article>
  );
}
