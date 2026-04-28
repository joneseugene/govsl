'use client'

import { useRouter } from 'next/navigation'
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface'
import ReactMarkdown from 'react-markdown'
import { markdownComponents } from '@/libs/consts/general.const'

export interface PressReleaseAllCardProps {
  release: PressReleaseInterface
}

export function PressReleaseAllCard({ release }: PressReleaseAllCardProps) {
  const router = useRouter()

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-gray-800">
          {release.mdas.name}
        </span>

        <span className="text-gray-600">•</span>

        {/* Hydration-safe date */}
        <time className="text-gray-600">
          {release.date}
        </time>

        {/* {release.type !== 'Press Release' && (
          <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {release.type}
          </span>
        )} */}
      </div>

      {/* Title */}
      <h2 className="mb-3 text-xl font-semibold text-blue-950 group-hover:text-blue-800 transition-colors">
        {release.title}
      </h2>

      {/* Description */}
      <p className="mb-4 text-xs text-gray-700">
        <ReactMarkdown components={markdownComponents}>
          {release.description}
        </ReactMarkdown>
      </p>

      {/* CTA */}
      <button
        onClick={() => router.push(`/press-release/${release.id}`)}
        className="mt-4 px-4 py-2 bg-blue-950 text-white text-sm rounded hover:bg-blue-800 transition"
      >
        Open
      </button>
    </article>
  )
}
