import { getServiceCategoryCounts } from '@/libs/api/services.api';
import AllServicesClient from './ServiceAll.client';

type SearchParams = {
    page?: string;
    search?: string;
    category?: string;
};

export default async function AllServicesServer({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    const safePage = Math.max(1, Number(params.page ?? 1) || 1);

    const search = params.search?.trim() || undefined;

    // Fetch grouped categories
    const result = await getServiceCategoryCounts();

    return (
        <AllServicesClient
            items={result.data}
            total={result.total ?? 0}
            currentPage={safePage}
            search={search}
            category={params.category ?? 'all'}
        />
    );
}