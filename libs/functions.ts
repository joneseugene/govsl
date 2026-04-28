export function formatDate(dateStr: string): string {
  if (/^\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(dateStr)) return dateStr;

  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Structured
export function formatDateSafe(dateString: string) {
  const date = new Date(dateString + 'T00:00:00Z')
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const suffix =
    day === 1 || day === 21 || day === 31 ? 'st'
    : day === 2 || day === 22 ? 'nd'
    : day === 3 || day === 23 ? 'rd'
    : 'th'

  return `${day}${suffix} ${months[date.getUTCMonth()]}, ${year}`
}
