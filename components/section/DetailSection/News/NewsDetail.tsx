'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getQRCode } from '@/libs/functions';

import { getNewsDetail, newsDetailQueryKey } from '@/libs/query/detail/news_detail.query';

interface Props {
  id: string;
}

export default function NewsDetailClient({ id }: Props) {
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState('');


  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: newsDetailQueryKey(id),
    queryFn: () => getNewsDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  useEffect(() => {
    setQrUrl(`${window.location.origin}/news/${id}`);
  }, [id]);

  if (isLoading) {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl text-center text-gray-500">
        Loading news article...
      </div>
    </section>
  );
}

if (isError || !news) {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl text-center text-gray-500">
        News article could not be loaded.
      </div>
    </section>
  );
}

  const formattedDate = useMemo(() => {
    if (!news?.date) return null;

    const parsed = new Date(news.date);

    if (isNaN(parsed.getTime())) return null;

    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, [news?.date]);

  const renderContent = (text?: string) => {
    if (!text) {
      return <p className="text-[#505A5F]">No content available.</p>;
    }

    return text.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();

      if (!trimmed) return null;

      if (trimmed.startsWith('**') && trimmed.endsWith(':**')) {
        return (
          <h2 key={index} className="mb-4 mt-12 font-heading text-3xl font-normal text-[#003366]">
            {trimmed.replace(/\*\*/g, '').replace(':', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <h3 key={index} className="mb-3 mt-8 font-heading text-2xl font-normal text-[#003366]">
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
          <ul
            key={index}
            className="mb-6 list-inside list-disc space-y-2 font-body text-[19px] leading-relaxed text-[#0B0C0C]"
          >
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^•\s*/, '')}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="mb-6 font-body text-[19px] leading-relaxed text-[#0B0C0C]">
          {trimmed}
        </p>
      );
    });
  };


  const category = news.category ?? 'News';
  const ministry = news.mdas?.name ?? 'Government of Sierra Leone';
  const headline = news.headline ?? news.title;
  const summary = news.summary;
  const content = news.content ?? '';
  const location = news.location;

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', page: '/' },
              { label: 'News and Articles', page: '/news' },
              { label: headline || id },
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

          {ministry && <p className="mb-2 font-body text-[16px] text-[#505A5F]">{ministry}</p>}

          {formattedDate && (
            <p className="mb-2 font-body text-[19px] text-[#505A5F]">Published: {formattedDate}</p>
          )}

          {location && (
            <p className="mb-2 font-body text-[19px] text-[#505A5F]">Location: {location}</p>
          )}
        </div>

        <SectionHeading
          level="h5"
          title={headline}
          description={summary}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
        />

        {summary && (
          <div className="mb-12 border border-[#B1B4B6] bg-[#F3F2F1] p-5">
            <p className="font-body text-[19px] leading-relaxed text-[#0B0C0C]">
              <strong>Summary:</strong> {summary}
            </p>
          </div>
        )}

        <article className="font-body text-[19px] leading-relaxed">
          {renderContent(content)}
        </article>

        <div className="mt-16 border-t border-[#B1B4B6] pt-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl text-[#505A5F]">
              <p className="mb-2 font-heading text-[19px] font-normal text-[#003366]">
                Government of Sierra Leone
              </p>

              <p className="font-body leading-relaxed">
                This is an official government news publication.
              </p>
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
