'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function AboutPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'About GOV.SL' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="About GOV.SL"
          description="The official digital gateway to Government of Sierra Leone services and information."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10 text-[#0b0c0c]">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">What is GOV.SL?</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              GOV.SL is the official online portal of the Government of Sierra Leone. It brings
              together news, publications, appointments, services, and information from Ministries,
              Departments, and Agencies (MDAs) into a single, accessible platform for citizens,
              residents, and the international community.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Our Mission</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              To promote open, transparent, and accountable governance by making government
              information readily accessible to every Sierra Leonean. We are committed to delivering
              a digital experience that is simple, fast, and inclusive.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Government of Sierra Leone</h2>
            <p className="mb-4 text-[17px] leading-relaxed text-[#4B5563]">
              The Republic of Sierra Leone is a constitutional republic with a democratically
              elected President who serves as both Head of State and Head of Government. The
              government is structured into three branches:
            </p>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                {
                  branch: 'Executive',
                  desc: 'Led by the President and Cabinet, responsible for policy implementation and administration.',
                },
                {
                  branch: 'Legislature',
                  desc: 'The Parliament of Sierra Leone enacts laws and oversees the executive.',
                },
                {
                  branch: 'Judiciary',
                  desc: 'An independent judiciary interprets and applies the law.',
                },
              ].map(({ branch, desc }) => (
                <li key={branch} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>
                    <span className="font-semibold text-[#003366]">{branch}: </span>
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">What You Can Find Here</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'News & Press Releases',
                  desc: 'Official government communications and statements.',
                },
                { title: 'Appointments', desc: 'Presidential and ministerial appointments.' },
                { title: 'Publications', desc: 'Reports, policies, and official documents.' },
                {
                  title: 'Services',
                  desc: 'Links to government services and e-government platforms.',
                },
                { title: 'MDAs', desc: 'Directory of Ministries, Departments, and Agencies.' },
                { title: 'Announcements', desc: 'Public notices and government announcements.' },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-xl border border-[#003366]/10 bg-[#f8f8f8] p-5">
                  <p className="mb-1 font-semibold text-[#003366]">{title}</p>
                  <p className="text-sm text-[#4B5563]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-[#008A3C] bg-[#f0faf4] px-6 py-5">
            <p className="text-[15px] text-[#4B5563]">
              GOV.SL is maintained by the Office of the Chief Minister in collaboration with the
              Ministry of Information and Civic Education. For technical enquiries, please visit our{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                Contact Us
              </button>{' '}
              page.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
