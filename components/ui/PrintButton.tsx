'use client';

import { RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  contentRef: RefObject<HTMLElement | null>;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  className?: string;
}

export function PrintButton({
  contentRef,
  label = 'Print',
  loadingLabel = 'Generating...',
  loading = false,
  className = '',
}: PrintButtonProps) {
  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={loading}
      className={`rounded-md bg-[#008A3C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#006D2F] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none ${className}`}
    >
      {loading ? loadingLabel : label}
    </button>
  );
}