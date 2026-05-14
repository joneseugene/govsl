'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Privacy Policy' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h1"
          title="Privacy Policy"
          description="How the Government of Sierra Leone collects and uses your information."
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
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Who We Are</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              GOV.SL is operated by the Government of Sierra Leone. This privacy policy explains
              what personal data we collect when you use this portal, why we collect it, and how we
              handle it.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">What We Collect</h2>
            <p className="mb-4 text-[17px] leading-relaxed text-[#4B5563]">
              We collect minimal data necessary to operate and improve this portal:
            </p>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Usage data: pages visited, time on site, and how you navigate the portal (anonymised).',
                'Search queries entered into the portal search bar.',
                'Technical data: browser type, device type, and IP address (used for security monitoring).',
                'Any information you voluntarily submit via contact or feedback forms.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">How We Use Your Data</h2>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'To operate and maintain the GOV.SL portal.',
                "To improve the portal's content and usability based on anonymised usage patterns.",
                'To respond to enquiries and feedback you submit.',
                'To monitor and protect the security of the portal.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Cookies</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              This portal uses essential cookies required for it to function correctly. We do not
              use advertising or tracking cookies. You can configure your browser to refuse cookies,
              but this may affect certain features of the portal.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Sharing Your Data</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              We do not sell, trade, or transfer your personal data to third parties. Data may be
              shared with government agencies where required to fulfil a public duty or comply with
              a legal obligation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Your Rights</h2>
            <p className="mb-4 text-[17px] leading-relaxed text-[#4B5563]">
              You have the right to:
            </p>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Request access to personal data we hold about you.',
                'Request correction of inaccurate data.',
                'Request deletion of your data where there is no lawful basis to retain it.',
                'Object to processing of your data in certain circumstances.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Contact</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              For any privacy-related enquiries, please{' '}
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
