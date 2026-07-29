'use client';

import { useRouter } from 'next/navigation';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@/libs/consts/general.const';
import { formatDate } from '@/libs/functions';

export interface PressReleaseAllCardProps {
  release: PressReleaseInterface;
}

export function PressReleaseAllCard({ release }: PressReleaseAllCardProps) {
  const router = useRouter();

  return (
    <article className="group relative overflow-hidden hover:cursor-pointer">
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-600">{release.mdas?.name}</span>
        <span className="text-gray-600">|</span>
        <time className="text-gray-600">{formatDate(release.date)}</time>

      </div>

      {/* Title */}
      <h5 
      onClick={() => router.push(`/press-releases/${release.id}`)}
      className={`font-medium
          text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
          text-[#1D70B8] group-hover:cursor-pointer
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
        `}>
        {release.title}
      </h5>

      {/* Description */}
      <p className="mb-4 text-xs text-gray-700">
        <ReactMarkdown components={markdownComponents}>{release.description}</ReactMarkdown>
      </p>
    </article>
  );
}
