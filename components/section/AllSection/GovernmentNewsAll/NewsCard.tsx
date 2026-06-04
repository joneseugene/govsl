'use client';

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
      "
    >
      {/* Meta */}
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
            <time>{formattedDate}</time>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={() => onReadMore(id)}
        className="
          text-left w-full
          mb-3
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
      >
        {/* Headline */}
        <h5
          className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
        `}
        >
          {title}
        </h5>
      </button>
    </article>
  );
}
