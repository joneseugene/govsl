'use client';

import { Printer } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LOGO } from '@/libs/consts/nav.const';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';
import { formatDate, getQRCode } from '@/libs/functions';
import { useReactToPrint } from 'react-to-print';

interface AppointmentDetailProps {
  notices: AppointmentInterface[];
}

export function AppointmentDetail({ notices }: AppointmentDetailProps) {
  const router = useRouter();

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  useEffect(() => {
    setQrUrl(getQRCode(window.location.href));
  }, []);

  if (!notices?.length) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold text-[#003366]">Appointment Not Found</h1>

        <button
          type="button"
          onClick={() => router.push('/appointment')}
          className="mt-4 text-[#1D70B8] underline"
        >
          Back
        </button>
      </div>
    );
  }

  const first = notices[0];

  const allAppointees = notices.flatMap(
    (notice) =>
      notice.linked_letters?.map((appointee) => ({
        id: appointee.id,
        type: appointee.type,
        name: appointee.appointee_name || 'Unnamed Appointee',
        position: appointee.position || '',
        appointmentDate: appointee.appointment_date,
        officeName: appointee.office_name,
        referenceNumber: appointee.reference_number,
      })) ?? [],
  );

  return (
    <div className="bg-[#F5F7FA] py-8">
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3 px-12">
        <button
          type="button"
          onClick={() => router.push('/appointment')}
          className="inline-flex items-center justify-center rounded-md bg-[#003366] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#002244]"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handlePrint}
          disabled={loading}
          className="
            inline-flex items-center justify-center gap-2
            rounded-md bg-[#008A3C] px-4 py-2
            text-sm font-medium text-white transition
            hover:bg-[#006D2F]
            disabled:cursor-not-allowed disabled:opacity-70
          "
        >
          <Printer size={16} />
          {loading ? 'Generating...' : 'Print'}
        </button>
      </div>

      <div
        ref={printRef}
        className="relative mx-auto bg-white shadow-xl"
        style={{
          maxWidth: '210mm',
          minHeight: '297mm',
          padding: '25mm 22mm',
        }}
      >
        <div className="mb-10 flex justify-between text-[13px]">
          <p className="font-semibold text-slate-700">Ref: {first.reference_number || 'N/A'}</p>
        </div>

        <div className="mb-14 text-center">
          <Image
            src={LOGO.coatOfArms.src}
            alt={LOGO.coatOfArms.alt}
            width={90}
            height={90}
            className="mx-auto mb-4 w-24"
          />

          <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#003366]">
            <div>Government of Sierra Leone</div>
            {first.office_name && <div>{first.office_name}</div>}
            <div>State House</div>
          </div>
        </div>

        <div className="mt-1 mb-6 text-center">
          <p className="text-sm font-semibold leading-7 text-slate-700 underline underline-offset-4">
            {first.title}
          </p>
        </div>

        <div className="mb-6">
          {first.notice_intro && (
            <p className="text-sm leading-7 text-slate-700">{first.notice_intro}</p>
          )}

          <div className="mt-6 space-y-3">
            {allAppointees.map((appointee, index) => (
              <div key={`${appointee.id}-${index}`} className="grid grid-cols-12 gap-4 pb-3">
                {/* Name */}
                <div className="col-span-5">
                  <p className="text-sm text-slate-700">
                    {index + 1}. {appointee.name}
                  </p>
                </div>

                {/* Position */}
                <div className="col-span-7">
                  <p className="text-sm text-slate-700">{appointee.position || '-'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex items-end justify-between gap-10">
            {/* Left */}
            <div>
              <div className="mb-3 h-px w-60 bg-slate-300" />

              {first.signatory_name && (
                <p className="text-sm uppercase text-slate-700">{first.signatory_name}</p>
              )}

              {first.signatory_title && (
                <p className="text-sm uppercase text-slate-500">{first.signatory_title}</p>
              )}
            </div>

            {/* Right */}
            {first.appointment_date && (
              <div className="text-right">
                <p className="text-sm text-slate-500">Date</p>
                <p className="text-sm font-medium text-slate-700">
                  {formatDate(first.appointment_date)}
                </p>
              </div>
            )}
          </div>
        </div>

        {qrUrl && (
          <div className="absolute bottom-[22mm] right-[22mm] text-center">
            <img src={qrUrl} width={90} height={90} alt="Verification QR code" />
            <p className="mt-1 text-[10px] text-slate-500">Scan to verify</p>
          </div>
        )}
      </div>
    </div>
  );
}
