'use client'

import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

interface SearchProps {
  label?: string
  placeholder?: string
  onSearch: (query: string) => void
  value?: string
  className?: string
}

export function Search2({
  label = 'Search',
  placeholder = 'Search appointee, position, office...',
  onSearch,
  value = '',
  className = '',
}: SearchProps) {
  const [query, setQuery] = useState(value)

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      {/* Input */}
      <div
        className="
          relative flex items-center rounded-xl
          bg-blue-50/40
          border border-slate-500
          shadow-sm
          transition-all duration-200
          hover:border-blue-300
          focus-within:border-blue-500
          focus-within:bg-white
          focus-within:ring-2 focus-within:ring-blue-100
        "
      >
        <SearchIcon className="ml-3.5 h-4 w-4 text-slate-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            const q = e.target.value
            setQuery(q)
            onSearch(q)
          }}
          placeholder={placeholder}
          className="
            flex-1 bg-transparent outline-none
            px-2.5 py-2.5
            text-sm text-slate-900
            placeholder:text-slate-400
          "
        />
      </div>
    </div>
  )
}
