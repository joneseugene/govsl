'use client'

import { Printer } from 'lucide-react'
import { mockAppointments } from '@/libs/sampleData'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { LOGO } from '@/libs/consts/nav.const'

interface AppointmentDetailProps {
    noticeId: string
    onNavigate: (page: string) => void
}

export function AppointmentDetail({ noticeId, onNavigate }: AppointmentDetailProps) {
    const notice = mockAppointments.find(n => n.id === noticeId)
    const [qrUrl, setQrUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!notice) return

        const url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
            window.location.origin + '/' + notice.id
        )}`

        setQrUrl(url)
    }, [notice])

    if (!notice) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Appointment Notice Not Found</h1>
                <button
                    onClick={() => onNavigate('appointments-all')}
                    className="underline text-blue-700"
                >
                    View all appointment notices
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white">
            {/* Document */}
            <div
                style={{
                    maxWidth: '210mm',
                    margin: '0 auto',
                    padding: '25mm 20mm',
                    minHeight: '297mm',
                    position: 'relative'
                }}
            >
                {/* Actions */}
                <div className="no-print max-w-240 mx-auto py-6 flex gap-4">
                    <button
                        onClick={() => onNavigate('home')}
                        className="px-6 py-3 bg-[#003366] text-white"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-[#008A3C] text-white flex items-center gap-2"
                    >
                        <Printer size={20} />
                        Print
                    </button>
                </div>
                {/* Header */}
                <div className="flex justify-between items-start text-[12px] mb-10">
                    {/* Left: Reference */}
                    <strong>Ref: {notice.referenceNumber}</strong>

                    {/* Right: Office details */}
                    {(notice.office || notice.officeAddress?.length) && (
                        <div className="text-right uppercase font-bold leading-5">
                            {notice.office && <div>{notice.office}</div>}
                            {notice.officeAddress?.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                            {notice.date && <div>{notice.date}</div>}
                        </div>
                    )}
                </div>


                {/* Coat of Arms */}
                <div className="text-center mb-12">
                    <Image
                        src={LOGO.coatOfArms.src}
                        alt={LOGO.coatOfArms.alt}
                        width={45}
                        height={45}
                        className="mx-auto w-25"
                        priority
                    />
                    <div className="font-bold tracking-widest text-sm mt-2">
                        GOVERNMENT OF SIERRA LEONE
                    </div>
                </div>

                {/* Recipient Information */}
                {notice.recipientName && (
                    <div className="mb-8 text-sm">
                        <div className="font-bold">{notice.recipientName}</div>
                        {notice.recipientAddress && (
                            <div>{notice.recipientAddress}</div>
                        )}
                    </div>
                )}

                {/* Salutation */}
                {notice.recipientName && (
                    <div className="mb-8 text-sm">
                        Dear{' '}
                        {notice.recipientName.trim().includes(' ')
                            ? `Sir/Madam.`
                            : 'Sir/Madam.'},
                    </div>
                )}



                {/* Title */}
                <h2 className="text-center font-bold underline tracking-wide mb-10 text-base">
                    {notice.title}
                </h2>

                {/* Content */}
                <div className="text-sm leading-[1.8] text-justify mb-16">
                    {notice.content?.split('\n\n').map((p, i) => (
                        <p key={i} className="mb-4">{p}</p>
                    ))}
                </div>

                {/* Signature */}
                <div className="text-left mb-16">
                    <div className="font-bold uppercase">{notice.signatory.name}</div>
                    <div className="uppercase text-sm">{notice.signatory.title}</div>
                </div>

                {/* Copy */}
                {notice.copyTo?.length && (
                    <div className="text-xs">
                        <strong>Copy:</strong>
                        {notice.copyTo.map((c, i) => (
                            <div key={i} className="ml-10">"{c}"</div>
                        ))}
                    </div>
                )}

                {/* QR */}
                {qrUrl && (
                    <div className="absolute bottom-[20mm] right-[20mm] text-center">
                        <img src={qrUrl} width={80} />
                        <div className="text-[9px] mt-1">Scan to verify authenticity</div>
                    </div>
                )}
            </div>
        </div>
    )
}
