"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HomeSection } from "@/components/ui/HomeSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Search2 } from "@/components/ui/SearchUI2";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Pagination } from "@/components/ui/PaginationUI";
import { PublicationCard } from "@/components/section/AllSection/PublicationAll/PublicationCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useDebounce } from "@/libs/hook/useDebounce";
import { PublicationInterface } from "@/libs/interface/publications.interface";

type MinistryOption = {
  id: string;
  name: string;
};

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
  publications: PublicationInterface[];
  total: number;
  ministries: MinistryOption[];
};

export default function PublicationAllClient({
  currentPage,
  search,
  ministryId,
  publications,
  total,
  ministries,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? "all");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const items = publications;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace("/");
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (from) {
      params.set("from", from);
    }

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (selectedMinistry !== "all") {
      params.set("ministryId", selectedMinistry);
    }

    router.replace(`/publication?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedMinistry, router, from]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (from) {
      params.set("from", from);
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    if (selectedMinistry !== "all") {
      params.set("ministryId", selectedMinistry);
    }

    router.replace(`/publication?${params.toString()}`, {
      scroll: false,
    });
  };

  const ministryOptions = useMemo(() => {
    return [
      { value: "all", label: "All Ministries" },
      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Home", page: "/" },
            { label: "Publications and Reports" },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="All Publications & Reports"
          description="Policy documents, white papers, and official government reports"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={handleBack}
        />

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

        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} publications
        </p>

        <div className="space-y-10">
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
                date={pub.date}
                title={pub.title}
                description={pub.description ?? ""}
                onReadMore={(id) => router.push(`/publication/${id}`)}
              />
            ))
          )}
        </div>

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