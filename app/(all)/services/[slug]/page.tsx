import ServicesSlugServer from "@/components/section/AllSection/Services/ServiceSlugAll/ServiceSlugAll.server";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServiceCategoryPage({ params }: Props) {
    const { slug } = await params;

    return <ServicesSlugServer categoryPage={slug} />;
}