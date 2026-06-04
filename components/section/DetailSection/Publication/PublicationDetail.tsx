'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getQRCode } from '@/libs/functions';

import {
  getPublicationDetail,
  publicationDetailQueryKey,
} from '@/libs/query/detail/publication_detail.query';

interface PublicationDetailClientProps {
  id: string;
}

export default function PublicationDetailClient({ id }: PublicationDetailClientProps) {
  const router = useRouter();

  const {
    data: publication,
    isLoading,
    isError,
  } = useQuery({
    queryKey: publicationDetailQueryKey(id),
    queryFn: () => getPublicationDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl text-center text-gray-500">Loading publication...</div>
      </section>
    );
  }

  if (isError || !publication) {
    return (
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl text-center text-gray-500">
          Publication could not be loaded.
        </div>
      </section>
    );
  }

  const { title, description, content, file_url, status, date, mdas } = publication;

  /* ---------------- QR ---------------- */
  const qrUrl = typeof window !== 'undefined' ? `${window.location.origin}/publication/${id}` : '';

  /* ---------------- DATE ---------------- */
  const formattedDate = useMemo(() => {
    if (!date) return null;

    const parsed = new Date(date);

    if (isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, [date]);

  /* ---------------- CONTENT RENDERER ---------------- */
  const renderContent = (text?: string) => {
    if (!text) {
      return <p className="text-[#505A5F]">No publication content available.</p>;
    }

    return text.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();

      /* H2 */
      if (trimmed.startsWith('**') && trimmed.endsWith(':**')) {
        return (
          <h2 key={index} className="mb-4 mt-12 text-3xl font-semibold text-[#003366]">
            {trimmed.replace(/\*\*/g, '').replace(':', '')}
          </h2>
        );
      }

      /* H3 */
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <h3 key={index} className="mb-3 mt-8 text-2xl font-semibold text-[#003366]">
            {trimmed.replace(/\*\*/g, '')}
          </h3>
        );
      }

      /* BULLETS */
      if (trimmed.startsWith('•')) {
        const items = trimmed
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);

        return (
          <ul key={index} className="mb-6 list-inside list-disc space-y-2 text-[#0B0C0C]">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^•\s*/, '')}</li>
            ))}
          </ul>
        );
      }

      /* PARAGRAPH */
      return (
        <p key={index} className="mb-6 leading-relaxed text-[#0B0C0C]">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* TOP META */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              {
                label: 'Home',
                page: '/',
              },
              {
                label: 'Publications',
                page: '/publication',
              },
              {
                label: `${id}`,
              },
            ]}
            onNavigate={(page) => router.push(page)}
            variant="government"
          />

          {/* STATUS */}
          <div className="mb-3 flex flex-wrap items-center gap-3">
            {status && (
              <span className="bg-[#F3F2F1] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#0B0C0C]">
                {status}
              </span>
            )}

            <span className="text-sm font-medium text-[#008A3C]">✓ Verified</span>
          </div>

          {/* MINISTRY */}
          {mdas?.name && <p className="mb-2 text-[19px] text-[#505A5F]">{mdas.name}</p>}

          {/* DATE */}
          {formattedDate && (
            <p className="mb-2 text-[19px] text-[#505A5F]">Published: {formattedDate}</p>
          )}
        </div>

        {/* TITLE */}
        <SectionHeading
          level="h2"
          title={title}
          description={description}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
        />

        {/* FILE DOWNLOAD */}
        {file_url && (
          <div className="mb-10">
            <a
              href={file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                rounded-md bg-[#003366]
                px-5 py-3
                text-sm font-medium text-white
                transition hover:bg-[#002244]
              "
            >
              View Attached Publication
            </a>
          </div>
        )}

        {/* CONTENT */}
        <div className="text-[19px] leading-relaxed">{renderContent(content)}</div>

        {/* FOOTER */}
        <div className="mt-16 border-t border-[#B1B4B6] pt-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            {/* LEFT */}
            <div className="max-w-xl text-[#505A5F]">
              <p className="mb-2 text-[19px] font-bold text-[#003366]">
                Government of Sierra Leone
              </p>

              <p className="leading-relaxed">This is an official government publication.</p>
            </div>

            {/* QR */}
            {qrUrl && (
              <div className="border-2 border-[#0B0C0C] p-3">
                <img src={getQRCode(qrUrl)} alt="QR Code" width={120} height={120} />

                <div className="mt-2 text-center text-[11px] text-[#505A5F]">Scan to verify</div>
              </div>
            )}
          </div>

          {/* GOV BAR */}
          <div className="mt-8 h-2 w-full bg-linear-to-r from-green-700 via-blue-800 to-yellow-400" />
        </div>
      </div>
    </section>
  );
}
