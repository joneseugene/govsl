'use client'

import { useEffect, useState } from 'react'
import { formatDateSafe } from '@/libs/functions'
import { PressReleaseDetail } from '@/libs/interface/press.releases.interface'
import { CustomBackIcon } from '../../../ui/CustomBackIcon'
import { CustomDivider } from '../../../ui/CustomDivider'
import ReactMarkdown from 'react-markdown'

interface PressReleaseDetailUIProps {
  pressRelease: PressReleaseDetail
  pdfUrl?: string
  onBack?: () => void
}

export function PressReleaseDetailUI({ pressRelease, pdfUrl, onBack }: PressReleaseDetailUIProps) {
  const { mda, title, content, id, type, refNumber, contact, externalLink, date } = pressRelease
  const docType = type === 'Vacancy' ? 'VACANCY ANNOUNCEMENT' : 'ANNOUNCEMENT'
  const ministry = mda?.name || 'Government of Sierra Leone'
  const acronym = mda?.acronym || 'GoSL'
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [loadingPDF, setLoadingPDF] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = pdfUrl || `${window.location.origin}/${id}`
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`)
    }
  }, [id, pdfUrl])

  //Handle PDF
  const handleGeneratePDF = async () => {
    setLoadingPDF(true)
    const { PressReleasePDF } = await import('./PressReleasePDF')
    PressReleasePDF.download(pressRelease)
    setLoadingPDF(false)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Action Buttons */}
      <div className="no-print max-w-4xl mx-auto px-4 py-6 flex gap-4">
        {onBack && (
          <button onClick={onBack} className="px-4 py-2 bg-[#003366] text-white text-lg flex items-center gap-2">
            <CustomBackIcon size={20} className="text-white" /> Back
          </button>
        )}

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
            <div>{formatDateSafe(date)}</div>
            {refNumber && <div>Ref: {refNumber}</div>}
          </div>
        </header>

        <CustomDivider />

        <h2 className="text-xl font-bold text-[#003366] mb-6 text-center tracking-[2px]">{docType}</h2>
        <h3 className="text-lg font-bold text-[#003366] mb-6 text-center">{title || 'Untitled'}</h3>

        <CustomDivider />

        <div className="text-sm leading-7 mb-6"><ReactMarkdown>{content}</ReactMarkdown></div>

        {externalLink && (
          <p className="mb-4">
            <strong>External Link: </strong>
            <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">
              {externalLink}
            </a>
          </p>
        )}

        {contact && <p className="mb-4"><strong>Contact: </strong>{contact}</p>}

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
          <CustomDivider className='mt-5' />
        </footer>
      </div>
    </div>
  )
}
