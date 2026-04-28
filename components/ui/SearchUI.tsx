'use client'

import { useState, useRef } from 'react'
import { Suggestion } from '../../libs/interface/searchInterface'

interface SearchProps {
    onSearch: (query: string) => void
    onSelect: (suggestion: Suggestion) => void
    suggestions: Suggestion[]
    isLoading?: boolean
    placeholder?: string
}

export default function Search({
    onSearch,
    onSelect,
    suggestions,
    isLoading = false,
    placeholder = 'Search GOV.SL',
}: SearchProps) {
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)
    const [index, setIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (index >= 0) onSelect(suggestions[index])
            else onSearch(query)
        } else if (e.key === 'ArrowDown') {
            setIndex((i) => Math.min(i + 1, suggestions.length - 1))
        } else if (e.key === 'ArrowUp') {
            setIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Escape') {
            setShow(false)
        }
    }

    return (
        <div className="relative w-full max-w-3xl">
            {/* Search bar */}
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSearch(query)
                }}
                className="
    flex items-stretch overflow-hidden rounded-lg
    border border-[#008A3C]
    bg-white
    shadow-sm
  "
            >
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                        const value = e.target.value
                        setQuery(value)
                        setShow(true)
                        setIndex(-1)
                        onSearch(value)
                    }}
                    onKeyDown={handleKey}
                    onFocus={() => setShow(true)}
                    onBlur={() => setTimeout(() => setShow(false), 150)}
                    placeholder={placeholder}
                    className="
    flex-1 px-5 py-4 text-lg
    text-gray-900 placeholder:text-gray-400
    focus:outline-none"
                    aria-autocomplete="list"
                    aria-controls="suggestions"
                    aria-expanded={show}
                />


                <button
                    type="submit"
                    className="
            inline-flex items-center justify-center
            px-6 text-lg font-medium
            bg-[#008A3C] text-white
            transition-colors
            hover:bg-[#006d2f]
            active:bg-[#005a26]
          "
                >
                    Search
                </button>
            </form>

            {/* Suggestions */}
            {show && (isLoading || suggestions.length > 0) && (
                <div
                    id="suggestions"
                    className="
            absolute z-10 mt-1 w-full
            overflow-hidden rounded-lg
            border border-[#008A3C]
            bg-white
            shadow-lg
            max-h-80 overflow-y-auto
          "
                >
                    {isLoading ? (
                        <p className="px-5 py-4 text-center text-gray-500">
                            Searching…
                        </p>
                    ) : (
                        suggestions.map((s, i) => (
                            <button
                                key={s.id}
                                onMouseDown={() => onSelect(s)}
                                className={`
                  w-full px-5 py-4 text-left
                  transition
                  ${i === index ? 'bg-gray-100' : 'hover:bg-gray-50'}
                `}
                            >
                                <p className="font-semibold text-[#003366]">
                                    {s.title}
                                </p>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    {s.type}
                                    {s.category && ` • ${s.category}`}
                                    {s.ministry && ` • ${s.ministry}`}
                                </p>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
