'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BackButton } from '@/components/ui/BackButton';
import { PrintButton } from '@/components/ui/PrintButton';

import { getQRCode } from '@/libs/functions';
import { getNewsDetail, newsDetailQueryKey } from '@/libs/query/detail/news_detail.query';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';

interface Props {
  id: string;
}

export default function NewsDetailClient({ id }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [loading] = useState(false);

  const qrUrl = getQRCode(`${process.env.NEXT_PUBLIC_BASE_URL}/news/${id}`);

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

  if (isLoading) {
    return (
      <section className="bg-white px-4 py-20 text-center text-gray-500">
        Loading news article...
      </section>
    );
  }

  if (isError || !news) {
    return (
      <section className="bg-white px-4 py-20 text-center text-gray-500">
        News article could not be loaded.
      </section>
    );
  }

  const category = news.category ?? 'News';
  const ministry = news.mdas?.name ?? 'Government of Sierra Leone';
  const headline = news.headline ?? news.title;
  const summary = news.summary;
  const content = news.content ?? '';

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* NON PRINT AREA */}
        <div className="no-print">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Home', page: '/' },
                { label: 'News and Articles', page: '/news' },
                { label: headline || id },
              ]}
              variant="government"
            />
          </div>

          {/* Actions */}
          <div className="mb-6 flex gap-3">
            <BackButton
              fallback="/news"
              className="
                rounded-md
                bg-[#003366]
                px-4 py-2
                text-sm
                font-medium
                text-white
                hover:bg-[#002244]
              "
            />

            <PrintButton contentRef={printRef} loading={loading} />
          </div>
        </div>

        {/* PRINT AREA */}
        <div
          ref={printRef}
          className="
    bg-white
    print:mx-auto
    print:w-full
    print:max-w-[210mm]
    print:min-h-[297mm]
    print:px-[20mm]
    print:py-[25mm]
    print:text-black
  "
        >
          {/* Header */}
          <div
            className="
              mb-8
              border-b
              border-[#B1B4B6]
              pb-6
              print:mb-6
            "
          >
            <SectionHeading
              level="h5"
              title={headline}
              descriptionClassName="text-gray-400"
              descriptionSizeClassName="text-[16px]"
            />
          </div>

          {/* Metadata */}
          <div className="mb-6">
            <div className="mb-3 flex gap-3">
              <span
                className="
                  bg-[#F3F2F1]
                  px-3
                  py-1
                  text-xs
                  font-medium
                  uppercase
                "
              >
                {category}
              </span>

              <span className="text-sm font-medium text-[#008A3C]">✓ Verified</span>
            </div>

            <p className="text-[#505A5F]">{ministry}</p>

            {news.date && (
              <p className="text-[#505A5F]">
                Published:{' '}
                {new Date(news.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>

          {/* Summary */}
          {summary && (
            <div
              className="
                mb-10
                border
                border-[#B1B4B6]
                bg-[#F3F2F1]
                p-5
                print:bg-white
              "
            >
              <strong>Summary:</strong> {summary}
            </div>
          )}

          {/* Content */}
          <article
            className="
              text-[19px]
              leading-relaxed
              print:text-[14px]
            "
          >
            <RichTextRenderer content={content} emptyMessage="No publication content available." />
          </article>

          {/* Footer */}
          <footer
            className="
              mt-16
              border-t
              border-[#B1B4B6]
              pt-6
              print:mt-10
            "
          >
            <div
              className="
                flex
                flex-col
                gap-8
                md:flex-row
                md:justify-between
              "
            >
              <div>
                <p className="font-bold text-[#003366]">Government of Sierra Leone</p>

                <p>This is an official government news publication.</p>
              </div>

              {qrUrl && (
                <div className="border-2 p-3">
                  <Image src={qrUrl} alt="QR Code" width={120} height={120} />

                  <p className="text-center text-xs">Scan to verify</p>
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
