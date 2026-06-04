type RichContentProps = {
  content?: string | null;
  className?: string;
  autoFormat?: boolean;
};

function formatRichText(value?: string | null): string {
  if (!value) return '';

  let html = value.trim();

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^•\s*(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = html.replace(/\n/g, '<br />');

  if (!/^<([a-z][\w-]*)\b/i.test(html)) {
    html = `<p>${html}</p>`;
  }

  return html;
}

export function RichContent({ content, className = '', autoFormat = true }: RichContentProps) {
  if (!content) return null;

  const html = autoFormat ? formatRichText(content) : content;

  return (
    <div
      className={`
        mt-8 text-[18px] leading-8 text-gray-800

        [&_h2]:mt-10 [&_h2]:mb-4
        [&_h2]:font-heading [&_h2]:text-3xl
        [&_h2]:font-normal [&_h2]:text-[#003366]

        [&_h3]:mt-8 [&_h3]:mb-3
        [&_h3]:font-heading [&_h3]:text-2xl
        [&_h3]:font-normal [&_h3]:text-[#003366]

        [&_p]:mb-5 [&_p]:leading-8
        [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc
        [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:list-decimal
        [&_li]:mb-2
        [&_a]:text-blue-700 [&_a]:underline
        [&_strong]:font-semibold

        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
