'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';

import { CustomDivider } from '../../../ui/CustomDivider';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BackButton } from '@/components/ui/BackButton';
import { PrintButton } from '@/components/ui/PrintButton';

import { formatDate, getQRCode } from '@/libs/functions';

import {
  getPressReleaseDetail,
  pressReleaseDetailQueryKey,
} from '@/libs/query/detail/press_release_detail.query';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface PressReleaseDetailUIProps {
  id: string;
  pdfUrl?: string;
}

export function PressReleaseDetailUI({
  id,
  pdfUrl,
}: PressReleaseDetailUIProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [loading] = useState(false);

  const {
    data: pressRelease,
    isLoading,
    isError,
  } = useQuery({
    queryKey: pressReleaseDetailQueryKey(id),
    queryFn: () => getPressReleaseDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const qrUrl = useMemo(() => {
    const url =
      pdfUrl || `${window.location.origin}/press-releases/${id}`;

    return getQRCode(url);
  }, [id, pdfUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-4 py-24 text-center text-gray-500">
        Loading press release...
      </div>
    );
  }

  if (isError || !pressRelease) {
    return (
      <div className="min-h-screen bg-white px-4 py-24 text-center text-gray-500">
        Press release could not be loaded.
      </div>
    );
  }

  const {
    title,
    mdas,
    content,
    reference_number,
    contact_info,
    date,
  } = pressRelease;

  const ministry = mdas?.name || 'Government of Sierra Leone';
  const acronym = mdas?.acronym || 'GoSL';
  const reference = reference_number || '-';

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header Actions */}
      <div className="no-print border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">

          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: 'Home', page: '/' },
                { label: 'Press Release', page: '/press-releases' },
                { label: `${reference}` },
              ]}
              variant="government"
            />
          </div>

          {/* Buttons aligned left */}
          <div className="flex items-center gap-3">
            <BackButton
              fallback="/press-release"
              className="
                rounded-md
                bg-[#003366]
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#002244]
              "
            />

            <PrintButton
              contentRef={printRef}
              loading={loading}
            />
          </div>

        </div>
      </div>


      {/* Printable Content */}
      <main className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">

        <article
          ref={printRef}
          className="
            w-full
            bg-white
            px-4
            py-6
            shadow-sm
            sm:px-8
            sm:py-10
            lg:px-16
            lg:py-14
            print:mx-auto
            print:min-h-[297mm]
            print:max-w-[210mm]
            print:px-[22mm]
            print:py-[25mm]
          "
        >

          {/* Document Header */}
          <header
            className="
              mb-5
              flex
              flex-col
              gap-4
              border-b
              border-slate-200
              pb-5
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >

            <div className="min-w-0 text-left">

              <h1 className="mt-1 break-words text-sm font-bold uppercase text-slate-900">
                {ministry}
              </h1>

              <p className="mt-1 text-xs text-slate-700 sm:text-sm">
                Public Relations Unit
              </p>

              <p className="mt-1 text-xs text-slate-700 sm:text-sm">
                Republic of Sierra Leone, West Africa
              </p>
            </div>


            <div
              className="
                shrink-0
                text-left
                text-xs
                font-medium
                text-slate-700
                sm:text-right
                sm:text-sm
              "
            >
              <div>{formatDate(date)}</div>

              {reference && (
                <div className="mt-1 break-all">
                  Ref: {reference}
                </div>
              )}
            </div>

          </header>


          {/* Title */}
          <h2
            className="
              mx-auto
              my-6
              max-w-3xl
              text-center
              text-base
              font-bold
              leading-snug
              text-[#003366]
              sm:text-lg
            "
          >
            {title || 'Untitled'}
          </h2>


          <CustomDivider />


          {/* Content */}
          <div
  className="
    prose
    prose-sm
    max-w-none
    leading-7
    text-slate-800
    break-words
    [overflow-wrap:anywhere]
    [&_*]:max-w-full
    [&_pre]:overflow-x-auto
    [&_code]:break-all
    sm:prose-base
  "
>
            <MarkdownRenderer content={content} />
          </div>


          {/* Contact */}
          {contact_info && (
            <p className="mt-6 break-words text-sm text-slate-800">
              <strong>Contact: </strong>
              {contact_info}
            </p>
          )}


          <CustomDivider className="mt-8" />


          {/* Footer */}
          <footer className="mt-10 pt-4 sm:mt-16 sm:pt-8">

            <div
              className="
                flex
                flex-col
                gap-6
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <div className="max-w-sm text-xs text-slate-700">

                <p className="mb-1 font-bold text-slate-900">
                  Government of Sierra Leone
                </p>

                <p>
                  This is an official document. Scan the QR code to verify.
                </p>

              </div>


              {qrUrl && (
                <div className="w-fit border-2 p-3">

                  <Image
                    src={qrUrl}
                    alt="QR Code"
                    width={100}
                    height={100}
                  />

                  <div className="mt-1 text-center text-[9px]">
                    Scan to verify
                  </div>

                </div>
              )}

            </div>


            <CustomDivider className="mt-5" />

          </footer>

        </article>

      </main>

    </div>
  );
}