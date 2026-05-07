'use client';

import { ArrowRight } from 'lucide-react';

export interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  date?: string;
  ministry?: string;
  onReadMore: (id: string) => void;
}

export function NewsCard({ id, ministry, date, title, summary, onReadMore }: NewsCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;
  return (
    <article
      className="
        group
        rounded-xl border border-gray-200
        bg-white p-6 shadow-sm
        transition-all
        hover:border-gray-300
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-gray-800">{ministry}</span>

        {ministry && formattedDate && (
          <span className="text-gray-500">•</span>
        )}

        {formattedDate && (
          <time className="text-gray-600">{formattedDate}</time>
        )}
      </div>

      {/* Headline */}
      <h2 className="mb-2 text-xl font-semibold text-blue-950 transition-colors group-hover:text-blue-800">
        {title}
      </h2>

      {/* Summary */}
      <p className="mb-4 line-clamp-3 text-sm text-gray-600">{summary}</p>

      {/* CTA */}
      <button
        onClick={() => onReadMore(id)}
        className="mt-4 px-4 py-2 bg-blue-950 text-white text-sm rounded hover:bg-blue-800 transition"
      >
        Open
      </button>
    </article>
  );
}
