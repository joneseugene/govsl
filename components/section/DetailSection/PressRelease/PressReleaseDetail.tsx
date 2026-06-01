'use client';

import { useMemo, useState, useRef } from 'react';
import { CustomDivider } from '../../../ui/CustomDivider';
import ReactMarkdown from 'react-markdown';
import { formatDate, getQRCode } from '@/libs/functions';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useReactToPrint } from 'react-to-print';

interface PressReleaseDetailUIProps {
  pressRelease: PressReleaseInterface;
  pdfUrl?: string;
  onBack?: () => void;
}

export function PressReleaseDetailUI({ pressRelease, pdfUrl }: PressReleaseDetailUIProps) {
  const { id, title, mdas, content, reference_numbers, contact_info, date } = pressRelease;
  const ministry = mdas?.name || 'Government of Sierra Leone';
  const acronym = mdas?.acronym || 'GoSL';
  const reference = reference_numbers || '-';
  const [loading] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/press-release');
    }
  };

  const qrUrl = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const url = pdfUrl || `${window.location.origin}/press-release/${id}`;

    return getQRCode(url);
  }, [id, pdfUrl]);

  //Handle PDF
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* TOP BAR */}
      <div className="no-print border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            <Breadcrumb
              items={[
                {
                  label: 'Home',
                  page: '/',
                },
                {
                  label: 'Press Release',
                  page: '/press-release',
                },
                {
                  label: `${pressRelease.reference_numbers}`,
                },
              ]}
              onNavigate={(page) => router.push(page)}
              variant="government"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-3 pr-6">
            <button
              onClick={handleBack}
              className="
              inline-flex items-center justify-center gap-2
              bg-[#003366]
              px-4 py-2
              text-sm font-medium text-white
            "
            >
              Back
            </button>

            <button
              onClick={handlePrint}
              className="
              inline-flex items-center justify-center
              rounded-md bg-[#008A3C]
              px-4 py-2
              text-sm font-medium text-white
              transition hover:bg-[#006D2F]
              hover:cursor-pointer
            "
            >
              {loading ? 'Generating...' : 'Print'}
            </button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div
        ref={printRef}
        className="relative mx-auto bg-white shadow-md"
        style={{
          maxWidth: '210mm',
          minHeight: '297mm',
          padding: '25mm 22mm',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 pb-20 pt-8">
          {/* Header */}
          <header className="mb-5 flex items-start justify-between pb-6">
            <div className="text-left">
              <div className="text-2xl font-bold text-[#0033A0]">{acronym}</div>

              <h1 className="mt-1 text-lg font-bold uppercase">{ministry}</h1>

              <p className="mt-1 text-sm">Public Relations Unit</p>

              <p className="mt-1 text-sm">Republic of Sierra Leone, West Africa</p>
            </div>

            <div className="text-right text-sm font-medium">
              <div>{formatDate(date)}</div>

              {reference && <div>Ref: {reference}</div>}
            </div>
          </header>

          <CustomDivider />

          <h3 className="mx-auto mb-6 max-w-2xl px-4 text-center text-lg font-bold leading-snug text-[#003366]">
            {title || 'Untitled'}
          </h3>

          <CustomDivider />

          <div className="mb-6 text-sm leading-7">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {contact_info && (
            <p className="mb-4">
              <strong>Contact: </strong>
              {contact_info}
            </p>
          )}

          <CustomDivider />

          <footer className="mt-16 pt-8">
            <div className="flex items-end justify-between">
              <div className="max-w-sm text-xs">
                <p className="mb-1 font-bold">Government of Sierra Leone</p>

                <p>This is an official document. Scan the QR code to verify.</p>
              </div>

              {qrUrl && (
                <div className="border-2 p-3">
                  <img src={qrUrl} alt="QR Code" width={100} height={100} />

                  <div className="mt-1 text-center text-[9px]">Scan to verify</div>
                </div>
              )}
            </div>

            <CustomDivider className="mt-5" />
          </footer>
        </div>
      </div>
    </div>
  );
}
