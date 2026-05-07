// components/section/DetailSection/MdaDetail/MdaDetailPage.tsx
'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { useRouter } from 'next/navigation';

interface Props {
  mda: MDAInterface;
  relatedAgencies: MDAInterface[];
}

export default function MdaDetailPage({ mda, relatedAgencies }: Props) {
  const router = useRouter();

  return (
    <section className="bg-[#F8F8F8] min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <button onClick={() => router.push('/')} className="hover:text-blue-700">
            Home
          </button>

          <span>/</span>

          <button onClick={() => router.push('/mda')} className="hover:text-blue-700">
            MDAs
          </button>

          <span>/</span>

          <span className="text-[#003366] font-medium">{mda.acronym || mda.name}</span>
        </div>

        {/* Hero */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {mda.type && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                    {mda.type}
                  </span>
                )}

                {mda.acronym && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {mda.acronym}
                  </span>
                )}
              </div>

              <SectionHeading
                level="h1"
                title={mda.name}
                description={mda.mission || mda.vision || ''}
                showBack
                onBack={() => router.push('/mda')}
              />
            </div>

            {/* Contact Card */}
            {mda.contact && (
              <div className="w-full lg:max-w-sm rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-lg font-semibold text-[#003366] mb-4">Contact Information</h3>

                <div className="space-y-3 text-sm text-gray-700">
                  {mda.contact.email && (
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p>{mda.contact.email}</p>
                    </div>
                  )}

                  {mda.contact.phone && (
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p>{mda.contact.phone}</p>
                    </div>
                  )}

                  {mda.contact.address && (
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p>{mda.contact.address}</p>
                    </div>
                  )}

                  {mda.contact.website && (
                    <div>
                      <p className="font-medium text-gray-900">Website</p>

                      <a
                        href={mda.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline break-all"
                      >
                        {mda.contact.website}
                      </a>
                    </div>
                  )}

                  {mda.contact.hours && (
                    <div>
                      <p className="font-medium text-gray-900">Opening Hours</p>
                      <p>{mda.contact.hours}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ministers */}
        {(mda.minister || mda.deputy_minister) && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mda.minister && (
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                <span className="text-xs uppercase tracking-wide text-blue-700 font-semibold">
                  Minister
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#003366]">{mda.minister.name}</h3>

                {mda.minister.title && <p className="mt-1 text-gray-600">{mda.minister.title}</p>}

                {mda.minister.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">{mda.minister.bio}</p>
                )}
              </div>
            )}

            {mda.deputy_minister && (
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                <span className="text-xs uppercase tracking-wide text-blue-700 font-semibold">
                  Deputy Minister
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#003366]">
                  {mda.deputy_minister.name}
                </h3>

                {mda.deputy_minister.title && (
                  <p className="mt-1 text-gray-600">{mda.deputy_minister.title}</p>
                )}

                {mda.deputy_minister.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {mda.deputy_minister.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Related Agencies */}
        {relatedAgencies.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#003366]">
                Related Agencies ({relatedAgencies.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedAgencies.map((agency) => (
                <button
                  key={agency.id}
                  onClick={() => router.push(`/mda/${agency.id}`)}
                  className="
                    text-left rounded-2xl border border-gray-200
                    bg-white p-5 shadow-sm
                    transition-all duration-200
                    hover:border-blue-500 hover:shadow-md
                  "
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {agency.acronym && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                        {agency.acronym}
                      </span>
                    )}

                    {agency.type && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                        {agency.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[#003366] line-clamp-2">
                    {agency.name}
                  </h3>

                  {(agency.mission || agency.vision) && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {agency.mission || agency.vision}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
