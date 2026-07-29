import React from 'react';

type RichTextRendererProps = {
  content?: string;
  emptyMessage?: string;
  classNames?: {
    h2?: string;
    h3?: string;
    p?: string;
    ul?: string;
    empty?: string;
  };
};

export function RichTextRenderer({
  content,
  emptyMessage = 'No content available.',
  classNames = {},
}: RichTextRendererProps) {
  if (!content) {
    return (
      <p className={classNames.empty ?? 'text-[#505A5F]'}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      {content.split('\n\n').map((paragraph, index) => {
        const trimmed = paragraph.trim();

        // Heading 2 (**Heading:**)
        if (trimmed.startsWith('**') && trimmed.endsWith(':**')) {
          return (
            <h2
              key={index}
              className={
                classNames.h2 ??
                'mb-4 mt-12 text-3xl font-semibold text-[#003366]'
              }
            >
              {trimmed.replace(/\*\*/g, '').replace(':', '')}
            </h2>
          );
        }

        // Heading 3 (**Heading**)
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return (
            <h3
              key={index}
              className={
                classNames.h3 ??
                'mb-3 mt-8 text-2xl font-semibold text-[#003366]'
              }
            >
              {trimmed.replace(/\*\*/g, '')}
            </h3>
          );
        }

        // Bullet list
        if (trimmed.startsWith('•')) {
          const items = trimmed
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean);

          return (
            <ul
              key={index}
              className={
                classNames.ul ??
                'mb-6 list-inside list-disc space-y-2 text-[#0B0C0C]'
              }
            >
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace(/^•\s*/, '')}</li>
              ))}
            </ul>
          );
        }

        // Paragraph
        return (
          <p
            key={index}
            className={
              classNames.p ??
              'mb-6 leading-relaxed text-[#0B0C0C]'
            }
          >
            {trimmed}
          </p>
        );
      })}
    </>
  );
}