import { getServiceCategoryCounts } from "@/libs/api/services.api";

export default async function TestSection() {
  const result = await getServiceCategoryCounts();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Service Category Test
      </h1>

      <div className="space-y-3">
        {result.data.length === 0 ? (
          <p className="text-gray-500">No data found</p>
        ) : (
          result.data.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">{item.category}</p>
                {item.category_page && (
                  <p className="text-sm text-gray-500">
                    {item.category_page}
                  </p>
                )}
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">
                {item.count}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}