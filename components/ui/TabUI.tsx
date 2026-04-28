'use client'

export type TabOption = string | { value: string; label: string }

interface TabsProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: TabOption[]
  className?: string
}

export function Tabs({
  label = 'Categories',
  value,
  onChange,
  options,
  className = '',
}: TabsProps) {
  return (
    <div className={`rounded-lg bg-slate-100 p-2 ${className}`}>
      <div className="mb-2 text-xs font-semibold text-[#003366]">
        {label}:
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map(option => {
          const tab =
            typeof option === 'string'
              ? { value: option, label: option }
              : option

          const active = tab.value === value

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`
                rounded-md px-3 py-1.5 text-sm border
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-200
                ${active
                  ? 'bg-[#003366] text-white border-[#003366] font-semibold'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}
              `}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
