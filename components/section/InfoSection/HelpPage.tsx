'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const faqs = [
  {
    q: 'What is GOV.SL?',
    a: 'GOV.SL is the official digital portal of the Government of Sierra Leone. It provides citizens and the public with access to government news, publications, appointments, services, and information from Ministries, Departments, and Agencies.',
  },
  {
    q: 'How do I find a specific Ministry or Agency?',
    a: 'Visit the MDAs section from the main navigation. You can search by name or browse the full directory of Ministries, Departments, and Agencies.',
  },
  {
    q: 'Where can I read the latest government news?',
    a: 'The News section contains all published government news and articles. You can filter by ministry and search for specific topics.',
  },
  {
    q: 'How do I access government services?',
    a: 'The Services section lists government services with links to the relevant platforms. Some services are provided directly on this portal, while others redirect to dedicated ministry websites.',
  },
  {
    q: 'Is the information on this portal official?',
    a: 'Yes. All content on GOV.SL is published by authorised government offices. Press releases, appointments, and publications are official government communications.',
  },
  {
    q: 'How do I report an issue with the portal?',
    a: 'Use the Contact Us page to reach the portal team. Please describe the issue clearly, including the page you were on and what you were trying to do.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#003366]/10 last:border-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-[#003366]">{q}</span>
        {open ? (
          <ChevronUpIcon className="h-5 w-5 shrink-0 text-[#003366]" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 shrink-0 text-[#505A5F]" />
        )}
      </button>
      {open && <p className="pb-5 text-[16px] leading-relaxed text-[#4B5563]">{a}</p>}
    </div>
  );
}

export default function HelpPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Help & Support' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Help & Support"
          description="Answers to common questions about using the GOV.SL portal."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10">
          <div className="rounded-xl border border-[#003366]/10 bg-white px-6">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>

          <div className="rounded-xl border-l-4 border-[#008A3C] bg-[#f0faf4] px-6 py-5">
            <p className="mb-1 font-semibold text-[#003366]">Still need help?</p>
            <p className="text-[15px] text-[#4B5563]">
              If you could not find an answer above, please{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                contact us
              </button>{' '}
              and we will be happy to assist you.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
