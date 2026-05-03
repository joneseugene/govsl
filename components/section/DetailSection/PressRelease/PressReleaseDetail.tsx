'use client';

import { useEffect, useState } from 'react';
import { CustomBackIcon } from '../../../ui/CustomBackIcon';
import { CustomDivider } from '../../../ui/CustomDivider';
import ReactMarkdown from 'react-markdown';
import { formatDate, getQRCode } from '@/libs/functions';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { useRouter } from 'next/navigation';

interface PressReleaseDetailUIProps {
  pressRelease: PressReleaseInterface;
  pdfUrl?: string;
  onBack?: () => void;
}

export function PressReleaseDetailUI({ pressRelease, pdfUrl, onBack }: PressReleaseDetailUIProps) {
  const { id, title, mdas, content, legacy_id, contact_info, date } = pressRelease;
  const ministry = mdas?.name || 'Government of Sierra Leone';
  const acronym = mdas?.acronym || 'GoSL';
  const reference = legacy_id || 'reference_no';
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/press-release');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = pdfUrl || `${window.location.origin}/${id}`;
      setQrUrl(getQRCode(url));
    }
  }, [id, pdfUrl]);

  //Handle PDF
  const handleGeneratePDF = async () => {
    setLoadingPDF(true);
    const { PressReleasePDF } = await import('./PressReleasePDF');
    PressReleasePDF.download(pressRelease);
    setLoadingPDF(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Action Buttons */}
      <div className="no-print max-w-4xl mx-auto px-4 py-6 flex gap-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-[#003366] text-white text-lg flex items-center gap-2 cursor-pointer"
        >
          <CustomBackIcon size={20} className="text-white" /> Back
        </button>

        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-[#008A3C] text-white text-lg flex items-center gap-2"
        >
          {loadingPDF ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Header */}
        <header className="mb-5 pb-6 flex justify-between items-start">
          <div className="text-left">
            <div className="text-2xl font-bold text-[#0033A0]">{acronym}</div>
            <h1 className="text-lg font-bold uppercase mt-1">{ministry}</h1>
            <p className="text-sm mt-1">Public Relations Unit</p>
            <p className="text-sm mt-1">Republic of Sierra Leone, West Africa</p>
          </div>
          <div className="text-right text-sm font-medium">
            <div>{formatDate(date)}</div>
            {reference && <div>Ref: {reference}</div>}
          </div>
        </header>

        <CustomDivider />

        <h3 className="text-lg font-bold text-[#003366] mb-6 text-center max-w-2xl mx-auto px-4 leading-snug">
          {title || 'Untitled'}
        </h3>

        <CustomDivider />

        <div className="text-sm leading-7 mb-6">
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
          <div className="flex justify-between items-end">
            <div className="text-xs max-w-sm">
              <p className="font-bold mb-1">Government of Sierra Leone</p>
              <p>This is an official document. Scan the QR code to verify.</p>
            </div>
            {qrUrl && (
              <div className="border-2 p-3">
                <img src={qrUrl} alt="QR Code" width={100} height={100} />
                <div className="text-[9px] text-center mt-1">Scan to verify</div>
              </div>
            )}
          </div>
          <CustomDivider className="mt-5" />
        </footer>
      </div>
    </div>
  );
}
