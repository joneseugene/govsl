'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content?: string;
  emptyMessage?: string;
  className?: string;
  preprocess?: boolean;
}

const normalizeMarkdown = (content: string) => {
  return content
    // Convert Unicode bullets to Markdown bullets
    .replace(/^•\s/gm, '- ')
    // Convert **Heading:** to ##
    .replace(/\*\*(.+?):\*\*/g, '## $1')
    // Convert **Heading** to ###
    .replace(/\*\*(.+?)\*\*/g, '### $1');
};

export function MarkdownRenderer({
  content,
  emptyMessage = 'No content available.',
  className,
  preprocess = true,
}: MarkdownRendererProps) {
  const markdown = preprocess
    ? normalizeMarkdown(content ?? emptyMessage)
    : content ?? emptyMessage;

  return (
    <div
      className={
        className ??
        'prose max-w-none text-[19px] leading-relaxed'
      }
    >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="mb-6 mt-12 text-4xl font-semibold text-[#003366]"
              {...props}
            />
          ),

          h2: ({ node, ...props }) => (
            <h2
              className="mb-4 mt-12 text-3xl font-semibold text-[#003366]"
              {...props}
            />
          ),

          h3: ({ node, ...props }) => (
            <h3
              className="mb-3 mt-8 text-2xl font-semibold text-[#003366]"
              {...props}
            />
          ),

          h4: ({ node, ...props }) => (
            <h4
              className="mb-3 mt-6 text-xl font-semibold text-[#003366]"
              {...props}
            />
          ),

          p: ({ node, ...props }) => (
            <p
              className="mb-6 leading-relaxed text-[#0B0C0C]"
              {...props}
            />
          ),

          ul: ({ node, ...props }) => (
            <ul
              className="mb-6 list-inside list-disc space-y-2 text-[#0B0C0C]"
              {...props}
            />
          ),

          ol: ({ node, ...props }) => (
            <ol
              className="mb-6 list-inside list-decimal space-y-2 text-[#0B0C0C]"
              {...props}
            />
          ),

          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),

          strong: ({ node, ...props }) => (
            <strong
              className="font-semibold text-[#003366]"
              {...props}
            />
          ),

          em: ({ node, ...props }) => (
            <em {...props} />
          ),

          a: ({ node, ...props }) => (
            <a
              className="text-[#1D70B8] underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-6 border-l-4 border-[#003366] pl-4 italic"
              {...props}
            />
          ),

          hr: () => (
            <hr className="my-10 border-[#B1B4B6]" />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}