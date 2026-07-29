'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallback: string;
  label?: string;
  className?: string;
  replace?: boolean;
}

export function BackButton({
  fallback,
  label = 'Back',
  className = '',
  replace = true,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // If there is browser history, go back.
    if (window.history.length > 1) {
      router.back();
      return;
    }

    // Otherwise, use the fallback page.
    if (replace) {
      router.replace(fallback);
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={className}
    >
      {label}
    </button>
  );
}