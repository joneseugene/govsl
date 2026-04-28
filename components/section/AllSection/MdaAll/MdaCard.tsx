// MDACard.tsx
'use client'
import React from 'react'

interface MDACardProps {
  name: string
  acronym: string
  type: string
  description: string
  onViewClick: () => void
}

export const MDACard: React.FC<MDACardProps> = ({ name, acronym, type, description, onViewClick }) => {
  return (
    <div className="flex flex-col justify-between w-full border border-gray-200 rounded-lg bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-900 transition-all duration-200">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-blue-950">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{acronym} | {type}</p>
      </div>
      <button
        onClick={onViewClick}
        className="mt-3 rounded bg-blue-950 px-3 py-1 text-sm font-medium text-white hover:bg-blue-900 transition"
      >
        View
      </button>
    </div>
  )
}
