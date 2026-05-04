"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { HomeSection } from "@/components/ui/HomeSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Search2 } from "@/components/ui/SearchUI2";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Pagination } from "@/components/ui/PaginationUI";
import { PublicationCard } from "@/components/section/AllSection/PublicationAll/PublicationCard";

import { useDebounce } from "@/libs/hook/useDebounce";

export default function AllPublicationsClient({
    items,
    total,
    currentPage,
    search,
    ministryId,
    ministries
}: {
    items: any[];
    total: number;
    currentPage: number;
    search?: string;
    ministryId?: string;
    ministries: { id: string; name: string }[];
}) {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(search ?? "");
    const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? "all");

    const debouncedSearch = useDebounce(searchQuery, 500);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(total / itemsPerPage);

    /* ---------------- URL Sync ---------------- */
    useEffect(() => {
        const params = new URLSearchParams();

        params.set("page", "1");

        if (debouncedSearch?.trim()) {
            params.set("search", debouncedSearch.trim());
        }

        if (selectedMinistry !== "all") {
            params.set("ministry", selectedMinistry);
        }

        router.push(`/publication?${params.toString()}`);
    }, [debouncedSearch, selectedMinistry]);

    const updatePage = (page: number) => {
        const params = new URLSearchParams();

        params.set("page", page.toString());

        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (selectedMinistry !== "all") params.set("ministry", selectedMinistry);

        router.push(`/publication?${params.toString()}`, { scroll: false });
    };

    /* ---------------- Options ---------------- */
    const ministryOptions = useMemo(() => {
        if (!ministries) return [{ value: 'all', label: 'All Ministries' }];

        return [
            { value: 'all', label: 'All Ministries' },
            ...ministries.map((m) => ({
                value: m.id,
                label: m.name,
            })),
        ];
    }, [ministries]);


    return (
        <HomeSection>
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    level="h2"
                    title="All Publications & Reports"
                    description="Policy documents, white papers, and official government reports"
                    showBack
                    onBack={() => router.push("/")}
                />

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <Search2 value={searchQuery} onSearch={setSearchQuery} />
                    </div>

                    <div className="flex-1">
                        <FilterDropdown
                            value={selectedMinistry}
                            onChange={setSelectedMinistry}
                            options={ministryOptions}
                        />
                    </div>

                </div>

                {/* Count */}
                <p className="mb-6 text-sm text-gray-600">
                    Showing {items.length} of {total} publications
                </p>

                {/* List */}
                <div className="space-y-5">
                    {items.length === 0 ? (
                        <div className="rounded-xl bg-white p-10 text-center text-gray-500">
                            No matching publications found.
                        </div>
                    ) : (
                        items.map((pub) => (
                            <PublicationCard
                                key={pub.id}
                                id={pub.id}
                                ministry={pub.mdas?.name ?? ""}
                                date={pub.created_at}
                                title={pub.title}
                                file_size={pub.file_size}
                                description={pub.description}
                                category={pub.category}
                                onReadMore={(id) => router.push(`/publication/${id}`)}
                            />
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={updatePage}
                        />
                    </div>
                )}
            </div>
        </HomeSection>
    );
}