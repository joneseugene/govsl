'use client'

import { useState, useEffect } from 'react'

interface PublicationCardProps {
    id: string
    title: string
    ministry: string
    date: string
    fileSize?: string
    category?: string
    summary?: string
    onReadMore: (id: string) => void
}

export function PublicationCard({
    id,
    title,
    ministry,
    date,
    fileSize,
    category,
    summary,
    onReadMore
}: PublicationCardProps) {
    const [showFull, setShowFull] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const snippet = summary ? summary.slice(0, 120) : ''

    if (!mounted) {
        // Render fallback to match server HTML
        return (
            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-500">{ministry} • {date}</p>
            </article>
        )
    }

    return (
        <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{title}</h2>

            {/* Ministry and Category */}
            <div className="flex items-center justify-between mb-1 text-sm text-gray-500">
                <span>{ministry}</span>
                {category && (
                    <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wide bg-gray-100 text-gray-800 rounded-full">
                        {category}
                    </span>
                )}
            </div>

            {/* File Size and Date */}
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                {fileSize && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-700 rounded-full">
                        {fileSize}
                    </span>
                )}
                <time dateTime={date}>{date}</time>
            </div>

            {/* Summary */}
            {summary && (
                <p className="text-gray-700 mb-3">
                    {showFull ? summary : snippet + (summary.length > 120 ? '...' : '')}
                </p>
            )}

            {summary && summary.length > 120 && (
                <button
                    onClick={() => setShowFull(!showFull)}
                    className="mt-2 px-3 py-1 text-sm text-[#003366] underline hover:text-blue-950"
                >
                    {showFull ? 'Show Less' : 'Read Full'}
                </button>
            )}

            {/* Open Button */}
            <button
                onClick={() => onReadMore(id)}
                className="mt-4 px-4 py-2 bg-blue-950 text-white text-sm rounded hover:bg-blue-800 transition"
            >
                Open
            </button>
        </article>
    )
}
