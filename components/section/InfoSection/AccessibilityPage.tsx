'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function AccessibilityPage() {
  const router = useRouter();

  return (
    <HomeSection>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Accessibility' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Accessibility"
          description="Our commitment to making GOV.SL accessible to everyone."
          showBack
          onBack={() => router.back()}
        />

        <div className="space-y-10 text-[#0b0c0c]">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Accessibility Statement</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              The Government of Sierra Leone is committed to ensuring digital accessibility for all
              people, including those with disabilities. We continually improve the user experience
              for everyone and apply the relevant accessibility standards.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Conformance Status</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              We aim to conform to the{' '}
              <span className="font-semibold text-[#003366]">
                Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
              </span>
              . These guidelines explain how to make web content more accessible to people with
              disabilities. Conformance with these guidelines helps make the web more user-friendly
              for everyone.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Accessibility Features</h2>
            <ul className="space-y-3 text-[17px] text-[#4B5563]">
              {[
                'Semantic HTML structure for screen reader compatibility',
                'Sufficient colour contrast ratios across all text and backgrounds',
                'Keyboard-navigable interface throughout the portal',
                'Descriptive alternative text on all informational images',
                'Responsive design that works across screen sizes and zoom levels',
                'Focus indicators visible on all interactive elements',
                'Skip-to-content links for keyboard users',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#008A3C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Known Limitations</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              Some PDF documents published on this portal may not be fully accessible. We are
              working to remediate older documents. If you require an accessible version of a
              specific document, please{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                contact us
              </button>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold text-[#003366]">Feedback & Contact</h2>
            <p className="text-[17px] leading-relaxed text-[#4B5563]">
              We welcome feedback on the accessibility of GOV.SL. If you experience any barriers or
              have suggestions for improvement, please reach out via our{' '}
              <button
                onClick={() => router.push('/contact')}
                className="font-medium text-[#1D70B8] underline underline-offset-2 hover:text-[#003366]"
              >
                Contact Us
              </button>{' '}
              page. We aim to respond within 5 working days.
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-[#003366] bg-blue-50 px-6 py-5">
            <p className="text-[15px] text-[#4B5563]">
              This statement was last reviewed on{' '}
              <span className="font-semibold text-[#003366]">May 2026</span>.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
