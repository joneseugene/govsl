'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';
import { CustomDivider } from '../../../ui/CustomDivider';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { formatDate, getQRCode } from '@/libs/functions';
import {
  getPressReleaseDetail,
  pressReleaseDetailQueryKey,
} from '@/libs/query/detail/press_release_detail.query';

interface PressReleaseDetailUIProps {
  id: string;
  pdfUrl?: string;
}

export function PressReleaseDetailUI({ id, pdfUrl }: PressReleaseDetailUIProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleBack = () => {
    const from = searchParams.get('from');

    if (from) {
      router.replace(from);
      return;
    }

    router.replace('/press-release');
  };

  useEffect(() => {
    const url = pdfUrl || `${window.location.origin}/press-release/${id}`;
    setQrUrl(getQRCode(url));
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

  const { title, mdas, content, reference_numbers, contact_info, date } =
    pressRelease;

  const ministry = mdas?.name || 'Government of Sierra Leone';
  const acronym = mdas?.acronym || 'GoSL';
  const reference = reference_numbers || '-';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="no-print border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 overflow-hidden">
            <Breadcrumb
              items={[
                { label: 'Home', page: '/' },
                { label: 'Press Release', page: '/press-release' },
                { label: `${reference}` },
              ]}
              variant="government"
            />
          </div>

          <div className="flex w-full items-center gap-3 lg:w-auto">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-[#003366] px-4 py-2 text-sm font-medium text-white sm:flex-none"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 rounded-md bg-[#008A3C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#006D2F] sm:flex-none"
            >
              {loading ? 'Generating...' : 'Print'}
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
        <article
          ref={printRef}
          className="w-full bg-white px-4 py-6 shadow-sm sm:px-8 sm:py-10 lg:px-16 lg:py-14 print:mx-auto print:min-h-[297mm] print:max-w-[210mm] print:px-[22mm] print:py-[25mm]"
        >
          <header className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 text-left">
              <div className="text-base font-bold text-[#0033A0] sm:text-lg">
                {acronym}
              </div>

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

            <div className="shrink-0 text-left text-xs font-medium text-slate-700 sm:text-right sm:text-sm">
              <div>{formatDate(date)}</div>
              {reference && <div className="mt-1 break-all">Ref: {reference}</div>}
            </div>
          </header>

          <h2 className="mx-auto my-6 max-w-3xl text-center text-base font-bold leading-snug text-[#003366] sm:text-lg">
            {title || 'Untitled'}
          </h2>

          <CustomDivider />

          <div className="prose prose-sm max-w-none break-words leading-7 text-slate-800 sm:prose-base">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {contact_info && (
            <p className="mt-6 break-words text-sm text-slate-800">
              <strong>Contact: </strong>
              {contact_info}
            </p>
          )}

          <CustomDivider className="mt-8" />

          <footer className="mt-10 pt-4 sm:mt-16 sm:pt-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-sm text-xs text-slate-700">
                <p className="mb-1 font-bold text-slate-900">
                  Government of Sierra Leone
                </p>

                <p>This is an official document. Scan the QR code to verify.</p>
              </div>

              {qrUrl && (
                <div className="w-fit border-2 p-3">
                  <img src={qrUrl} alt="QR Code" width={100} height={100} />

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