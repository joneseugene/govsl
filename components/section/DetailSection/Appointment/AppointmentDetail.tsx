'use client';

import { Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { LOGO } from '@/libs/consts/nav.const';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';
import { formatDate, getQRCode } from '@/libs/functions';

interface AppointmentDetailProps {
  notices: AppointmentInterface[];
  date: string;
}

export function AppointmentDetail({ notices, date }: AppointmentDetailProps) {
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setQrUrl(getQRCode(window.location.href));
  }, [date]);

  if (!notices?.length) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold text-[#003366]">Appointment Not Found</h1>

        <button
          onClick={() => router.push('/appointment')}
          className="mt-4 text-[#1D70B8] underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  const first = notices[0];

  // ✅ FLATTEN ALL APPOINTEES INTO ONE LIST (THIS IS THE FIX)
  const allAppointees = notices.flatMap((n) => {
    const names = n.appointee_name?.split(',').map((x) => x.trim()) || [];

    const positions = n.position?.split(',').map((x) => x.trim()) || [];

    return names.map((name, i) => ({
      name,
      position: positions[i] || '',
    }));
  });

  const handlePDF = async () => {
    setLoading(true);
    const { AppointmentPDF } = await import('./AppointmentPDF');
    await AppointmentPDF.download(notices, date);
    setLoading(false);
  };

  return (
    <div className="bg-[#F5F7FA] py-8">
      {/* ACTIONS */}
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3 px-12">
        <button
          onClick={() => router.push('/appointment')}
          className="inline-flex items-center justify-center rounded-md bg-[#003366] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#002244]"
        >
          Back
        </button>

        <button
          onClick={handlePDF}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#008A3C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#006D2F]"
        >
          <Printer size={16} />
          {loading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* DOCUMENT */}
      <div
        className="relative mx-auto bg-white shadow-xl"
        style={{
          maxWidth: '210mm',
          minHeight: '297mm',
          padding: '25mm 22mm',
        }}
      >
        {/* HEADER */}
        <div className="mb-10 flex justify-between text-[13px]">
          <p className="font-semibold text-slate-700">Ref: {first.reference_number || 'N/A'}</p>
        </div>

        {/* HEADER CENTER */}
        <div className="mb-14 text-center">
          <Image
            src={LOGO.coatOfArms.src}
            alt="Coat of Arms"
            width={90}
            height={90}
            className="mx-auto mb-4 w-24"
          />

          <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#003366]">
            <div>Government of Sierra Leone</div>
            <div>{first.office_name}</div>
            <div>State House</div>
          </div>
        </div>

        {/* BODY (FIXED: NO DUPLICATE LOOPING) */}
        <div className="mb-8 border-b border-slate-200 pb-8">
          <p className="text-sm leading-7 text-slate-700">{first.description}</p>

          {/* ✅ ONLY APPOINTEES LOOP */}
          <div className="mt-6 space-y-3">
            {allAppointees.map((a, index) => (
              <div key={index} className="rounded-md bg-slate-50 px-4 py-3">
                <p className="font-medium text-[#003366]">
                  {index + 1}. {a.name}
                </p>

                {a.position && <p className="mt-1 text-sm text-slate-600">{a.position}</p>}
              </div>
            ))}
          </div>

          {/* SIGNATURE + DATE */}
          <div className="mt-16 flex items-end justify-between gap-10">
            <div>
              <div className="mb-3 h-px w-60 bg-slate-300" />

              <p className="font-bold uppercase text-[#003366]">{first.signatory_name}</p>

              <p className="text-sm uppercase text-slate-500">{first.signatory_title}</p>
            </div>

            <p className="text-right text-sm text-slate-600">{formatDate(date)}</p>
          </div>

          {/* COPY */}
          {first.copy_to?.length ? (
            <div className="mt-6 text-sm">
              <p className="mb-2 font-bold text-slate-700">Copy:</p>

              <div className="space-y-1 text-slate-600">
                {first.copy_to.map((c, idx) => (
                  <p key={idx}>• {c}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* QR */}
        {qrUrl && (
          <div className="absolute bottom-[22mm] right-[22mm] text-center">
            <img src={qrUrl} width={90} />
            <p className="mt-1 text-[10px] text-slate-500">Scan to verify</p>
          </div>
        )}
      </div>
    </div>
  );
}
