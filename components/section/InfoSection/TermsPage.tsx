'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function TermsPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Terms & Conditions' }]}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Terms & Conditions"
          description="The terms governing your use of the GOV.SL portal."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10 text-[#0b0c0c]">
          <div className="rounded-xl border-l-4 border-[#003366] bg-blue-50 px-6 py-4">
            <p className="text-[15px] text-[#4B5563]">
              Last updated: <span className="font-semibold text-[#003366]">May 2026</span>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Acceptance of Terms</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              By accessing or using the GOV.SL portal, you agree to be bound by these Terms &amp;
              Conditions. If you do not agree with any part of these terms, please discontinue use
              of the portal.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Use of This Portal</h2>
            <p className="mb-4 text-[17px] leading-relaxed text-[#4B5563]">
              You may use GOV.SL for lawful purposes only. You agree not to:
            </p>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Use the portal in any way that violates Sierra Leonean law or regulation.',
                'Attempt to gain unauthorised access to any part of the portal or its infrastructure.',
                'Transmit harmful, fraudulent, or misleading content through any portal form or feature.',
                'Scrape, harvest, or systematically copy portal content for commercial purposes without permission.',
                'Impersonate any government official, agency, or other person.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#003366]/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Content & Accuracy</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              The Government of Sierra Leone makes every effort to ensure that information published
              on this portal is accurate and up to date. However, we cannot guarantee the
              completeness or currency of all content. Official legal instruments, gazettes, and
              legislation should be consulted for authoritative legal reference.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Intellectual Property</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              Unless otherwise stated, all content on GOV.SL is published under the{' '}
              <button
                onClick={() => router.push('/licence')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                Open Government Licence
              </button>
              . The Government of Sierra Leone coat of arms and official emblems are protected and
              may not be reproduced without explicit authorisation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">External Links</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              GOV.SL may contain links to external websites operated by government agencies or third
              parties. We do not endorse or take responsibility for the content of external sites.
              Linking to an external site does not imply any official affiliation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Limitation of Liability</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              The Government of Sierra Leone shall not be liable for any loss or damage arising from
              reliance on information provided on this portal, interruptions to the portal&apos;s
              availability, or errors in portal content.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Governing Law</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              These terms are governed by the laws of the Republic of Sierra Leone. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of Sierra Leone.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
