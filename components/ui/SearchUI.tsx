'use client';

import { useState, useRef } from 'react';
import { Suggestion } from '../../libs/interface/searchInterface';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onSelect: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
  isLoading?: boolean;
  placeholder?: string;
}

export default function Search({
  value,
  onChange,
  onSearch,
  onSelect,
  suggestions,
  isLoading = false,
  placeholder = 'Search GOV.SL',
}: SearchProps) {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (index >= 0) {
        onSelect(suggestions[index]);
      } else {
        onSearch(value);
      }
    } else if (e.key === 'ArrowDown') {
      setIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Escape') {
      setShow(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value);
        }}
        className="flex w-full items-stretch overflow-hidden rounded-xl border border-[#008A3C] bg-white shadow-sm"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShow(true);
            setIndex(-1);
          }}
          onKeyDown={handleKey}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          placeholder={placeholder}
          className="min-h-12 flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none sm:px-5 sm:py-4 sm:text-lg"
        />

        <button
          type="submit"
          className="shrink-0 bg-[#008A3C] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#006d2f] sm:px-6 sm:text-lg"
        >
          Search
        </button>
      </form>

      {show && (isLoading || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[#008A3C] bg-white shadow-lg sm:max-h-80">
          {isLoading ? (
            <p className="px-4 py-4 text-center text-sm text-gray-500 sm:text-base">Searching…</p>
          ) : (
            suggestions.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onMouseDown={() => onSelect(s)}
                className={`w-full px-4 py-3 text-left transition sm:px-5 sm:py-4 ${
                  i === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <p className="line-clamp-2 text-sm font-semibold text-[#003366] sm:text-base">
                  {s.title}
                </p>

                <p className="mt-1 line-clamp-1 text-xs text-gray-500 sm:text-sm">
                  {s.type}
                  {s.ministry && ` • ${s.ministry}`}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
