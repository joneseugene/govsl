'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const pillars = [
  {
    title: 'Open Data',
    desc: 'Government datasets are published in open, machine-readable formats for public use, research, and civic innovation.',
  },
  {
    title: 'Public Procurement',
    desc: 'Contract awards, tender notices, and procurement outcomes are disclosed to promote fair competition and reduce corruption.',
  },
  {
    title: 'Budget & Expenditure',
    desc: 'Annual budgets, mid-year reviews, and actual expenditure reports are published to enable public scrutiny of spending.',
  },
  {
    title: 'Performance Reporting',
    desc: 'Key performance indicators and service delivery targets for Ministries, Departments, and Agencies are tracked and published.',
  },
  {
    title: 'Beneficial Ownership',
    desc: 'Information on the beneficial owners of companies operating in Sierra Leone is maintained in a publicly accessible register.',
  },
  {
    title: 'Extractive Industries',
    desc: 'Revenue flows from the mining, oil, and gas sectors are disclosed in line with the Extractive Industries Transparency Initiative (EITI).',
  },
];

export default function TransparencyPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Transparency Dashboard' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h1"
          title="Transparency Dashboard"
          description="Sierra Leone's commitment to open, accountable, and transparent governance."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10 text-[#0b0c0c]">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Our Commitment</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              The Government of Sierra Leone is committed to the principles of open government —
              that citizens have the right to know how public resources are managed, how decisions
              are made, and how public services are delivered. Transparency is central to building
              trust between the government and the people.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Transparency Pillars</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-[#003366]/10 bg-[#f8f8f8] p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#008A3C]" />
                    <p className="font-semibold text-[#003366]">{title}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Open Government Partnership</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              Sierra Leone is a member of the Open Government Partnership (OGP). National Action
              Plans set out concrete commitments on transparency, accountability, civic
              participation, and the use of technology to strengthen governance. Progress against
              these commitments is publicly reported.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Access Government Data</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              Official publications, reports, and data releases can be found in the{' '}
              <button
                onClick={() => router.push('/publication')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                Publications
              </button>{' '}
              section. For specific data enquiries, please{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                contact us
              </button>
              .
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-[#008A3C] bg-[#f0faf4] px-6 py-5">
            <p className="mb-1 font-semibold text-[#003366]">Report Corruption</p>
            <p className="text-[15px] text-[#4B5563]">
              Citizens can report suspected corruption or misconduct through the Anti-Corruption
              Commission of Sierra Leone (ACC). Whistleblower protections apply.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
