'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function LicencePage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Open Government Licence' }]}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Open Government Licence"
          description="The terms under which GOV.SL content may be freely used and shared."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10 text-[#0b0c0c]">
          <div className="rounded-xl border border-[#008A3C]/30 bg-[#f0faf4] px-6 py-5">
            <p className="text-[17px] font-medium leading-relaxed text-[#003366]">
              Information published on GOV.SL is made available under the Open Government Licence
              (OGL). You are encouraged to use and re-use this information freely and flexibly.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">You Are Free To</h2>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Copy, publish, distribute, and transmit the information.',
                'Adapt the information (including combining it with other information).',
                'Exploit the information commercially, for example by combining it with other information, or by including it in your own product or application.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">You Must</h2>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Acknowledge the source of the information by including the attribution statement: "Contains public sector information from the Government of Sierra Leone, licensed under the Open Government Licence."',
                'Provide a link to this licence when distributing or publishing information derived from GOV.SL.',
                'Not use the information in a way that implies any official status or that the Government of Sierra Leone endorses you or your use of the information.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#003366]/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Exemptions</h2>
            <p className="mb-4 text-[17px] leading-relaxed text-[#4B5563]">
              This licence does not cover:
            </p>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Personal data in the information.',
                'Information that has not been publicly released.',
                'Military insignia.',
                'Third-party rights that the Government of Sierra Leone is not authorised to license.',
                'The Government of Sierra Leone coat of arms and official emblems.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4B5563]/30" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">No Warranty</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              The information is licensed &apos;as is&apos; and the Government of Sierra Leone
              excludes all representations, warranties, obligations, and liabilities in relation to
              the information to the maximum extent permitted by law. The Government is not liable
              for any errors or omissions in the information.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Governing Law</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              This licence is governed by the laws of the Republic of Sierra Leone.
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-[#003366] bg-blue-50 px-6 py-5">
            <p className="text-[15px] text-[#4B5563]">
              For questions about licensing or permissions beyond the scope of this licence, please{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                contact us
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
