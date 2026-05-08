'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServicesInterface } from '@/libs/interface/service/services.interface';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface ServiceDetailUIProps {
  service: ServicesInterface;
  onNavigate?: (id: string) => void;
}

export default function ServiceDetailUI({ service, onNavigate }: ServiceDetailUIProps) {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            {
              label: 'Home',
              page: '/',
            },
            {
              label: 'Service',
              page: '/service',
            },
            {
              label: `${service.name}`,
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />
        {/* TITLE */}
        <SectionHeading
          level="h2"
          title={service.name || 'Service Name'}
          description={service.description || ''}
          showBack
          onBack={() => router.push('/service')}
        />

        <p className="text-sm text-green-700 mb-10">
          {service.verified ? '✓ Verified' : 'Unverified'}
          {service.updated_at && ` • Last updated: ${service.updated_at}`}
        </p>

        {/* QUICK INFO */}
        <div className="bg-gray-100 p-5 rounded-lg mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.processing_time && (
            <p>
              <strong>Processing Time:</strong> {service.processing_time}
            </p>
          )}
          {service.price && (
            <p>
              <strong>Price:</strong> {service.price}
            </p>
          )}
          {service.service_provider && (
            <p>
              <strong>Provider:</strong> {service.service_provider}
            </p>
          )}
          {service.availability && (
            <p>
              <strong>Availability:</strong> {service.availability}
            </p>
          )}
        </div>

        {/* WHO CAN APPLY */}
        {service.who_can_apply?.length ? (
          <Section title="Who can apply">
            <List items={service.who_can_apply} />
          </Section>
        ) : null}

        {/* ELIGIBILITY */}
        {service.eligibility_requirements?.length ? (
          <Section title="Eligibility Requirements">
            <List items={service.eligibility_requirements} />
          </Section>
        ) : null}

        {/* DOCUMENTS */}
        {service.documents_required?.length ? (
          <Section title="Documents Required">
            {service.documents_required.map((doc, i) => (
              <div key={i} className="mb-4">
                {doc.category && <p className="font-semibold">{doc.category}</p>}
                <List items={doc.items} />
              </div>
            ))}
          </Section>
        ) : null}

        {/* APPLICATION STEPS */}
        {service.application_steps?.length ? (
          <Section title="How to Apply">
            {service.online_application_url && (
              <button
                onClick={() => window.open(service.online_application_url, '_blank')}
                className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                Apply Online
              </button>
            )}

            {service.application_steps.map((step) => (
              <div key={step.step} className="flex gap-4 mb-4">
                <div className="w-10 h-10 flex items-center justify-center border text-blue-600">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}

            {service.important_notes?.map((note, i) => (
              <p key={i} className="text-red-600 mt-2">
                <strong>Important:</strong> {note}
              </p>
            ))}
          </Section>
        ) : null}

        {/* FEES */}
        {service.fees?.length ? (
          <Section title="Fees">
            {service.fees.map((fee, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{fee.description}</span>
                <strong>{fee.amount}</strong>
              </div>
            ))}
          </Section>
        ) : null}

        {/* LOCATIONS */}
        {service.locations?.length ? (
          <Section title="Where to Apply">
            {service.locations.map((loc, i) => (
              <div key={i} className="border p-4 mb-3">
                <h3 className="font-semibold">{loc.name}</h3>
                <p>{loc.address}</p>
                <p>{loc.hours}</p>
                <p>{loc.phone}</p>
                {loc.email && <p>{loc.email}</p>}
              </div>
            ))}
          </Section>
        ) : null}

        {/* FAQ */}
        {service.faqs?.length ? (
          <Section title="FAQs">
            {service.faqs.map((faq, i) => (
              <div key={i} className="border mb-2">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between p-3"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={expandedFaq === i ? 'rotate-180' : ''} />
                </button>
                {expandedFaq === i && <p className="p-3 border-t">{faq.answer}</p>}
              </div>
            ))}
          </Section>
        ) : null}

        {/* RELATED */}
        {service.related_services?.length ? (
          <Section title="Related Services">
            {service.related_services.map((rel, i) => (
              <button
                key={i}
                onClick={() => router.push(`/service/${rel.page}`)}
                className="block text-blue-600 underline mb-2"
              >
                {rel.name}
              </button>
            ))}
          </Section>
        ) : null}
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 border-t pt-6">
      <h2 className="text-2xl font-bold text-[#003366] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-gray-800">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
