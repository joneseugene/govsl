// components/section/DetailSection/MdaDetail/MdaDetailPage.tsx
'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { useRouter } from 'next/navigation';

interface Props {
  mda: MDAInterface;
  relatedAgencies: MDAInterface[];
}

export default function MdaDetailPage({ mda, relatedAgencies }: Props) {
  const router = useRouter();

  console.log('Vis: ', mda.vision);

  const minister = typeof mda?.minister === 'string' ? JSON.parse(mda.minister) : mda?.minister;

  const deputy_minister =
    typeof mda?.deputy_minister === 'string'
      ? JSON.parse(mda.deputy_minister)
      : mda?.deputy_minister;

  return (
    <HomeSection
      backgroundColor="gray"
      hasBorderTop={false}
      padding="small"
      className="min-h-screen"
    >
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Home',
              page: '/',
            },
            {
              label: 'MDAs',
              page: '/mda',
            },
            {
              label: mda.acronym || mda.name,
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        {/* Head */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading
            level="h4"
            title={mda.name}
            fontWeight="font-normal"
            showBack
            onBack={() => router.push('/mda')}
          />
        </div>

        {/* Mandate */}
        {mda.mandate && (
          <div className="w-full border border-gray-200 bg-gray-100 p-5 mt-8">
            {mda.mandate && (
              <div>
                <span className="font-heading text-2xl font-normal tracking-tight text-[#003366] mb-4">Mandate</span>

                <p className="mt-1 font-body text-gray-600 text-lg">{mda?.mandate}</p>
              </div>
            )}
          </div>
        )}

        {/* About */}
        {(mda?.vision || mda?.mission) && (
          <div className="mt-8 w-full border-t border-gray-200 p-5">
            <h3 className="font-heading text-2xl font-normal tracking-tight text-[#003366] mb-4">About</h3>

            {mda?.vision && (
              <div className="mt-5">
                <p className="text-lg font-body leading-relaxed text-gray-700">
                  <span className="mr-2 font-heading font-normal text-black">Vision:</span>
                  {mda.vision}
                </p>
              </div>
            )}

            {mda?.mission && (
              <div className="mt-4">
                <p className="text-lg font-body leading-relaxed text-gray-700">
                  <span className="mr-2 font-heading font-normal text-black">Mission:</span>
                  {mda.mission}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ministers */}
        {(minister || deputy_minister) && (
          <div className="w-full border-t border-gray-200 p-5 mt-5">
            {minister && (
              <div>
                <span className="font-heading text-2xl font-normal tracking-tight text-[#003366] mb-4">Minister</span>

                <h3 className="mt-2 text-lg font-heading font-normal text-gray-900">{minister.name}</h3>

                {minister.title && (
                  <p className="mt-1 font-heading font-normal text-gray-900 text-lg">{minister.title}</p>
                )}

                {minister.bio && (
                  <p className="mt-4 text-lg font-body leading-relaxed text-gray-700">{minister.bio}</p>
                )}
              </div>
            )}

            {deputy_minister && (
              <div>
                <span className="font-heading text-2xl font-normal tracking-tight text-[#003366] mb-4">Deputy Minister</span>

                <h3 className="mt-2 text-lg font-heading font-normal text-gray-900">{deputy_minister.name}</h3>

                {deputy_minister.title && (
                  <p className="mt-1 font-heading font-normal text-gray-600 text-lg">{deputy_minister.title}</p>
                )}

                {deputy_minister.bio && (
                  <p className="mt-4 font-body text-lg leading-relaxed text-gray-700">
                    {deputy_minister.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {mda.contact && (
          <div className="w-full border border-gray-200 p-5 mt-5">
            <h3 className="font-heading text-2xl font-normal tracking-tight text-[#003366] mb-4">Contact Information</h3>

            <div className="space-y-3 text-sm text-gray-700">
              {mda.contact.email && (
                <p className="text-lg font-body text-gray-900">
                  <span className="font-bold">Email:</span> {mda.contact.email}
                </p>
              )}

              {mda.contact.phone && (
                <p className="text-lg font-body text-gray-900">
                  <span className="font-bold">Phone:</span> {mda.contact.phone}
                </p>
              )}

              {mda.contact.address && (
                <div>
                  <p className="text-lg font-body text-gray-900">
                    <span className="font-bold">Address:</span> {mda.contact.address}
                  </p>
                </div>
              )}

              {mda.contact.website && (
                <div>
                  <p className="text-lg font-body text-gray-900">
                    <span className="font-bold">Website: </span>

                    <a
                      href={mda.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline break-all"
                    >
                      {mda.contact.website}
                    </a>
                  </p>
                </div>
              )}

              {mda.contact.hours && (
                <div>
                  <p className="text-lg font-body text-gray-900">
                    <span className="font-bold">Office Hours:</span> {mda.contact.hours}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Agencies */}
        {relatedAgencies.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-normal text-[#003366]">
                Related Agencies ({relatedAgencies.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {relatedAgencies.map((agency) => (
                <button
                  key={agency.id}
                  onClick={() => router.push(`/mda/${agency.id}`)}
                  className="text-left"
                >
                  <h3 className="text-lg font-body font-normal text-[#1D70B8] line-clamp-2">{agency.name}</h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </HomeSection>
  );
}
