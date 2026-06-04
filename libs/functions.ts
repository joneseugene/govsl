import { QueryClient } from '@tanstack/react-query';

export function formatDate(date?: Date | string): string {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const formatted = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatted;
}

// Shuffle Array
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// Query Client
export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

/**
 * QR FUNCTIONS
 */

export const getQRCode = (url: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`;

/**
 * SERVER ERROR
 */
import { redirect } from 'next/navigation';

export function handleServerError(error: string, retryPath: string = '/') {
  redirect(`/error?message=${encodeURIComponent(error)}&retry=${encodeURIComponent(retryPath)}`);
}
