'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content?: string;
  emptyMessage?: string;
  className?: string;
  preprocess?: boolean;
}

const normalizeMarkdown = (content: string) => {
  return (
    content
      // Normalize line endings
      .replace(/\r\n/g, '\n')

      // Remove accidental indentation that creates Markdown code blocks
      .replace(/^( {4,}|\t+)/gm, '')

      // Remove citation placeholders
      .replace(/\[cite:\s*\d+\]/gi, '')

      // Convert Unicode bullets to Markdown bullets
      .replace(/^•\s/gm, '- ')

      // Convert **Heading:** to ##
      .replace(/\*\*(.+?):\*\*/g, '## $1')

      // Convert **Heading** to ###
      .replace(/\*\*(.+?)\*\*/g, '### $1')

      // Convert plain headings ending with :
      .replace(/^([A-Z][A-Za-z0-9,&'()\/\-\s]+):$/gm, '## $1')

      // Collapse excessive blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
};

export function MarkdownRenderer({
  content,
  emptyMessage = 'No content available.',
  className,
  preprocess = true,
}: MarkdownRendererProps) {
  const markdown = preprocess
    ? normalizeMarkdown(content ?? emptyMessage)
    : (content ?? emptyMessage);

  return (
    <div
      className={
        className ??
        `
          prose
          prose-lg
          max-w-none
          text-[19px]
          leading-relaxed
          break-words
          [overflow-wrap:anywhere]
          [&_*]:max-w-full
          [&_pre]:max-w-full
          [&_pre]:overflow-x-auto
          [&_table]:block
          [&_table]:overflow-x-auto
        `
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="mb-6 mt-12 text-4xl font-semibold text-[#003366]" {...props} />
          ),

          h2: (props) => (
            <h2 className="mb-4 mt-12 text-3xl font-semibold text-[#003366]" {...props} />
          ),

          h3: (props) => (
            <h3 className="mb-3 mt-8 text-2xl font-semibold text-[#003366]" {...props} />
          ),

          h4: (props) => (
            <h4 className="mb-3 mt-6 text-xl font-semibold text-[#003366]" {...props} />
          ),

          p: (props) => (
            <p
              className="mb-6 break-words leading-relaxed text-[#0B0C0C] [overflow-wrap:anywhere]"
              {...props}
            />
          ),

          ul: (props) => (
            <ul className="mb-6 list-inside list-disc space-y-2 text-[#0B0C0C]" {...props} />
          ),

          ol: (props) => (
            <ol className="mb-6 list-inside list-decimal space-y-2 text-[#0B0C0C]" {...props} />
          ),

          li: (props) => (
            <li className="break-words leading-relaxed [overflow-wrap:anywhere]" {...props} />
          ),

          strong: (props) => <strong className="font-semibold text-[#003366]" {...props} />,

          em: (props) => <em {...props} />,

          a: (props) => (
            <a
              className="break-all text-[#1D70B8] underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          blockquote: (props) => (
            <blockquote className="my-6 border-l-4 border-[#003366] pl-4 italic" {...props} />
          ),

          pre: (props) => (
            <pre
              className="my-6 max-w-full overflow-x-auto rounded-lg bg-slate-100 p-4 text-sm"
              {...props}
            />
          ),

          code: ({ inline, className, children, ...props }: any) =>
            inline ? (
              <code className="rounded bg-slate-100 px-1 py-0.5 break-all text-[0.9em]" {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            ),

          hr: () => <hr className="my-10 border-[#B1B4B6]" />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
