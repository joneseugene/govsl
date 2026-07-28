'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function FilterDropdown({
  label = 'Category',
  value,
  onChange,
  options,
  placeholder = 'All Categories',
  className = '',
  debounceMs = 300,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  /* ---------------- Debounce ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase().trim());
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  /* ---------------- Filtered Options ---------------- */
  const filteredOptions = useMemo(() => {
    if (!debouncedSearch) return options;

    return options.filter((opt) => opt.label.toLowerCase().includes(debouncedSearch));
  }, [options, debouncedSearch]);

  const selected = options.find((o) => o.value === value);
  const displayText = selected ? selected.label : placeholder;

  const closeDropdown = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {/* Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);

            if (open) {
              setSearch('');
            }
          }}
          className="
            relative w-full rounded-xl text-left
            bg-blue-50/40
            border border-slate-200
            px-3.5 py-2.5
            text-sm
            shadow-sm
            transition-all duration-200
            hover:border-blue-300
            focus:outline-none
            focus:border-blue-500
            focus:bg-white
            focus:ring-2 focus:ring-blue-100
          "
        >
          <span className={value ? 'text-slate-900 font-medium' : 'text-slate-500'}>
            {displayText}
          </span>

          <ChevronDown
            className={`
              absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4
              transition-transform duration-200
              ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}
            `}
          />
        </button>

        {open && (
          <div
            className="
              absolute z-50 mt-2 w-full
              rounded-xl border border-slate-200
              bg-white
              shadow-lg
              overflow-hidden
            "
          >
            {/* Search input */}
            <div className="p-2 border-b border-slate-100">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="
                  w-full rounded-lg
                  border border-slate-200
                  px-3 py-2
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100
                "
              />
            </div>

            {/* Options */}
            <div className="max-h-56 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">No results found</div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      closeDropdown();
                    }}
                    className={`
                      w-full px-4 py-2.5 text-left text-sm
                      transition-colors
                      ${
                        option.value === value
                          ? 'bg-blue-50 text-blue-800 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
