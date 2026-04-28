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

// Structured
export function formatDateSafe(dateString: string) {
  const date = new Date(dateString + 'T00:00:00Z');
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th';

  return `${day}${suffix} ${months[date.getUTCMonth()]}, ${year}`;
}
