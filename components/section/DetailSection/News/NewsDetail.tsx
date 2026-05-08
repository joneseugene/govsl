'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getQRCode } from '@/libs/functions';

interface Props {
  id: string;
  category: string;
  ministry?: string;
  date?: string;
  time?: string;
  location?: string;
  headline: string;
  summary?: string;
  excerpt?: string;
  content?: string;
}

export default function NewsDetailClient({
  id,
  category,
  ministry,
  date,
  time,
  location,
  headline,
  summary,
  excerpt,
  content,
}: Props) {
  const router = useRouter();

  const [qrUrl, setQrUrl] = useState('');

  /* ---------------- Client-only QR ---------------- */
  useEffect(() => {
    setQrUrl(`${window.location.origin}/news/${id}`);
  }, [id]);

  /* ---------------- Safe Date ---------------- */
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

  const renderContent = (text?: string) => {
    if (!text) {
      return <p className="text-[#505A5F]">No content available.</p>;
    }

    return text.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();

      if (trimmed.startsWith('**') && trimmed.endsWith(':**')) {
        return (
          <h2 key={index} className="mt-12 mb-4 text-3xl font-semibold text-[#003366]">
            {trimmed.replace(/\*\*/g, '').replace(':', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <h3 key={index} className="mt-8 mb-3 text-2xl font-semibold text-[#003366]">
            {trimmed.replace(/\*\*/g, '')}
          </h3>
        );
      }

      if (trimmed.startsWith('•')) {
        const items = trimmed
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);

        return (
          <ul key={index} className="mb-6 list-disc list-inside space-y-2 text-[#0B0C0C]">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^•\s*/, '')}</li>
            ))}
          </ul>
        );
      }

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
        <div className="mb-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              {
                label: 'Home',
                page: '/',
              },
              {
                label: 'News and Articles',
                page: '/news',
              },
              {
                label: `${id}`,
              },
            ]}
            onNavigate={(page) => router.push(page)}
            variant="government"
          />

          <div className="mb-3 flex flex-wrap items-center gap-3">
            {category && (
              <span className="bg-[#F3F2F1] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#0B0C0C]">
                {category}
              </span>
            )}

            <span className="text-sm font-medium text-[#008A3C]">✓ Verified</span>
          </div>

          {ministry && <p className="mb-2 text-[19px] text-[#505A5F]">{ministry}</p>}

          {formattedDate && (
            <p className="mb-2 text-[19px] text-[#505A5F]">
              Published: {formattedDate}
              {time ? ` at ${time}` : ''}
            </p>
          )}

          {location && <p className="mb-2 text-[19px] text-[#505A5F]">Location: {location}</p>}
        </div>

        <SectionHeading
          level="h2"
          title={headline}
          description={summary}
          showBack
          onBack={() => router.back()}
        />

        {excerpt && (
          <div className="mb-12 border border-[#B1B4B6] bg-[#F3F2F1] p-5">
            <p className="text-[19px] leading-relaxed text-[#0B0C0C]">
              <strong>Summary:</strong> {excerpt}
            </p>
          </div>
        )}

        <div className="text-[19px] leading-relaxed">{renderContent(content)}</div>

        <div className="mt-16 border-t border-[#B1B4B6] pt-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl text-[#505A5F]">
              <p className="mb-2 text-[19px] font-bold text-[#003366]">
                Government of Sierra Leone
              </p>

              <p className="leading-relaxed">This is an official government news publication.</p>
            </div>

            {qrUrl && (
              <div className="border-2 border-[#0B0C0C] p-3">
                <img src={getQRCode(qrUrl)} alt="QR Code" width={120} height={120} />

                <div className="mt-2 text-center text-[11px] text-[#505A5F]">Scan to verify</div>
              </div>
            )}
          </div>

          <div className="mt-8 h-2 w-full bg-linear-to-r from-green-700 via-blue-800 to-yellow-400" />
        </div>
      </div>
    </section>
  );
}
