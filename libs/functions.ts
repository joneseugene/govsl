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

// Format Date
// export function formatDateSafe(dateString: string) {
//   const date = new Date(dateString + 'T00:00:00Z');
//   const day = date.getUTCDate();
//   const year = date.getUTCFullYear();

//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   const suffix =
//     day === 1 || day === 21 || day === 31
//       ? 'st'
//       : day === 2 || day === 22
//         ? 'nd'
//         : day === 3 || day === 23
//           ? 'rd'
//           : 'th';

//   return `${day}${suffix} ${months[date.getUTCMonth()]}, ${year}`;
// }

// Shuffle Array
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * QR FUNCTIONS
 */

export const getQRCode = (url: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`;
