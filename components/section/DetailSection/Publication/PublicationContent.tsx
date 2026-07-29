'use client';

import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface PublicationContentProps {
  abstract?: string;
  executiveSummary?: string;
  description?: string;
  financialOverview?: string;
}

interface SectionProps {
  title: string;
  description?: string;
}

function PublicationSection({ title, description }: SectionProps) {
  if (!description?.trim()) return null;

  return (
    <section className="mb-14 border-t border-[#B1B4B6] pt-10">
      <h2 className="mb-6 text-4xl font-semibold text-[#003366]">
        {title}
      </h2>

      <MarkdownRenderer content={description} />
    </section>
  );
}

export function PublicationContent({
  abstract,
  executiveSummary,
  description,
  financialOverview,
}: PublicationContentProps) {
  return (
    <>
      {abstract && (
        <div className="mb-12 border border-[#B1B4B6] bg-[#F3F2F1] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[#003366]">
            Abstract
          </h2>

          <MarkdownRenderer content={abstract} />
        </div>
      )}

      <PublicationSection
        title="Executive Summary"
        description={executiveSummary}
      />

      <PublicationSection
        title="Description"
        description={description}
      />

      <PublicationSection
        title="Financial Overview"
        description={financialOverview}
      />
    </>
  );
}