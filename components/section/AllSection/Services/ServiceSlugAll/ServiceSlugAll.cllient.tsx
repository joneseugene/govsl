'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServicesInterface } from '@/libs/interface/service/services.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ServicesSlugResult {
  meta?: {
    name?: string;
    description?: string;
  };
  data?: ServicesInterface[];
}

interface Props {
  result: ServicesSlugResult;
  categoryPage: string;
}

export default function ServicesSlugClient({ result, categoryPage }: Props) {
  const router = useRouter();
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: 'Home',
            page: '/',
          },
          {
            label: 'Categories',
            page: '/service',
          },
          {
            label: 'Services',
          },
        ]}
        onNavigate={(page) => router.push(page)}
        variant="government"
      />

      <SectionHeading
        level="h3"
        title={result?.meta?.name || 'Category'}
        description={result?.meta?.description || ''}
        descriptionClassName="text-gray-400"
        descriptionSizeClassName="text-[20px]"
        showBack
        onBack={() => router.back()}
      />

      {/* Services List */}
      <div>
        {result?.data?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No services found for this category.</div>
        ) : (
          result?.data?.map((service: ServicesInterface) => (
            <div key={service.id} className="p-4 hover:bg-gray-50 transition">
              <Link
                href={`/service/${categoryPage}/${service.id}`}
                className={`font-medium
                  text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                  text-[#1D70B8] hover:cursor-pointer
                  group-hover:underline group-hover:underline-offset-4
                  decoration-2 transition-colors
                `}
              >
                {service.name}
              </Link>

              {service.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
