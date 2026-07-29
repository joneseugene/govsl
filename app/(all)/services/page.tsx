import AllServicesServer from '@/components/section/AllSection/Services/ServiceAll/ServiceAll.server';

type SearchParams = {
    page?: string;
    search?: string;
    ministryId?: string;
};

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default function ServiceDetailPage({ searchParams }: PageProps) {
    return <AllServicesServer searchParams={searchParams} />;
}
