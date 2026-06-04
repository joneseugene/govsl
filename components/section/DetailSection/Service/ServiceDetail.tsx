'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServiceDetail, serviceDetailQueryKey } from '@/libs/query/detail/service_detail.query';

export interface ServiceDetailUIProps {
  id: string;
  slug: string;
}

export default function ServiceDetailUI({ id, slug }: ServiceDetailUIProps) {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: serviceDetailQueryKey(id),
    queryFn: () => getServiceDetail(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  if (isLoading) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center text-gray-500">Loading service...</div>
      </section>
    );
  }

  if (isError || !service) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center text-gray-500">
          Service could not be loaded.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', page: '/' },
            { label: 'Categories', page: '/service' },
            { label: 'Services', page: `/service/${slug}` },
            { label: `${service.name}` },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title={service.name || 'Service Name'}
          description={service.description || ''}
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.push(`/service/${slug}`)}
        />

        <p className="mb-10 text-sm text-green-700">
          {service.verified ? '✓ Verified' : 'Unverified'}
          {service.updated_at && ` • Last updated: ${service.updated_at}`}
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-5 sm:grid-cols-2">
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

        {service.who_can_apply?.length ? (
          <Section title="Who can apply">
            <List items={service.who_can_apply} />
          </Section>
        ) : null}

        {service.eligibility_requirements?.length ? (
          <Section title="Eligibility Requirements">
            <List items={service.eligibility_requirements} />
          </Section>
        ) : null}

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

        {service.application_steps?.length ? (
          <Section title="How to Apply">
            {service.online_application_url && (
              <button
                type="button"
                onClick={() => window.open(service.online_application_url, '_blank')}
                className="mb-4 rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                Apply Online
              </button>
            )}

            {service.application_steps.map((step) => (
              <div key={step.step} className="mb-4 flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center border text-blue-600">
                  {step.step}
                </div>

                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}

            {service.important_notes?.map((note, i) => (
              <p key={i} className="mt-2 text-red-600">
                <strong>Important:</strong> {note}
              </p>
            ))}
          </Section>
        ) : null}

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

        {service.locations?.length ? (
          <Section title="Where to Apply">
            {service.locations.map((loc, i) => (
              <div key={i} className="mb-3 border p-4">
                <h3 className="font-semibold">{loc.name}</h3>
                <p>{loc.address}</p>
                <p>{loc.hours}</p>
                <p>{loc.phone}</p>
                {loc.email && <p>{loc.email}</p>}
              </div>
            ))}
          </Section>
        ) : null}

        {service.faqs?.length ? (
          <Section title="FAQs">
            {service.faqs.map((faq, i) => (
              <div key={i} className="mb-2 border">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="flex w-full justify-between p-3"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={expandedFaq === i ? 'rotate-180' : ''} />
                </button>

                {expandedFaq === i && <p className="border-t p-3">{faq.answer}</p>}
              </div>
            ))}
          </Section>
        ) : null}

        {service.related_services?.length ? (
          <Section title="Related Services">
            {service.related_services.map((rel, i) => (
              <button
                key={i}
                type="button"
                onClick={() => router.push(`/service/${rel.page}`)}
                className="mb-2 block text-blue-600 underline"
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
      <h2 className="mb-4 text-2xl font-bold text-[#003366]">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-1 text-gray-800">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
