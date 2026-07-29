import Link from 'next/link';
import { getServicesByCategorySlug } from '@/libs/api/services.api';

export default async function TestSection() {
  const result = await getServicesByCategorySlug({
    categoryPage: 'category-agriculture',
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-blue-950">{result.meta.name}</h1>
        <p className="text-gray-600 mt-1 text-lg">{result.meta.description}</p>
      </div>

      {/* Services List */}
      <div>
        {result.data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No services found for this category.</div>
        ) : (
          result.data.map((service) => (
            <div key={service.id} className="p-4 hover:bg-gray-50 transition">
              {/* Clickable Title */}
              <Link
                href={`/services/${service.id}`}
                className="
            text-lg font-semibold text-blue-950
            hover:underline hover:text-blue-800
            transition
          "
              >
                {service.name}
              </Link>

              {/* Description */}
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
