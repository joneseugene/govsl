'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Contact Us' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Contact Us"
          description="Get in touch with the Government of Sierra Leone."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10">
          {/* Contact cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                Icon: MapPin,
                title: 'Office Address',
                lines: ['State House', 'Tower Hill, Freetown', 'Sierra Leone'],
              },
              {
                Icon: Phone,
                title: 'Phone',
                lines: ['+232 22 220 000', '+232 22 220 001'],
              },
              {
                Icon: Mail,
                title: 'Email',
                lines: ['info@gov.sl', 'support@gov.sl'],
              },
              {
                Icon: Clock,
                title: 'Office Hours',
                lines: ['Monday – Friday', '8:00 AM – 5:00 PM (WAT)'],
              },
            ].map(({ Icon, title, lines }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-[#003366]/10 bg-[#f8f8f8] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003366]/10">
                  <Icon className="h-5 w-5 text-[#003366]" />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-[#003366]">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-[#4B5563]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* MDA directory note */}
          <div className="rounded-xl border-l-4 border-[#003366] bg-blue-50 px-6 py-5">
            <p className="mb-1 font-semibold text-[#003366]">
              Contact a specific Ministry or Agency
            </p>
            <p className="text-[15px] text-[#4B5563]">
              For enquiries directed at a specific Ministry, Department, or Agency, please visit the{' '}
              <button
                onClick={() => router.push('/mda')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                MDAs directory
              </button>{' '}
              to find their dedicated contact information.
            </p>
          </div>

          {/* Help note */}
          <div className="rounded-xl border-l-4 border-[#008A3C] bg-[#f0faf4] px-6 py-5">
            <p className="mb-1 font-semibold text-[#003366]">Need technical help?</p>
            <p className="text-[15px] text-[#4B5563]">
              For technical issues with this portal, visit our{' '}
              <button
                onClick={() => router.push('/help')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                Help &amp; Support
              </button>{' '}
              page.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
