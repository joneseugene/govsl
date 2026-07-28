"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { HomeSection } from "@/components/ui/HomeSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Search2 } from "@/components/ui/SearchUI2";
import { Pagination } from "@/components/ui/PaginationUI";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useDebounce } from "@/libs/hook/useDebounce";
import { ServiceCard } from "./ServiceCard";
import { ServiceCategory } from "@/libs/query/all/service_all.query";

type Props = {
  currentPage: number;
  search?: string;
  category?: string;
  services: ServiceCategory[];
};

export default function AllServicesClient({
  currentPage,
  search,
  category,
  services,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const [selectedCategory, setSelectedCategory] = useState(category ?? "all");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const from = searchParams.get("from");

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace("/");
  };

  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return services.filter((item) => {
      const matchesSearch = item.category.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categoryOptions = useMemo(() => {
    return [
      { value: "all", label: "All Categories" },
      ...services.map((c) => ({
        value: c.category,
        label: c.category,
      })),
    ];
  }, [services]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (from) {
      params.set("from", from);
    }

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    router.replace(`/service?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedCategory, router, from]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (from) {
      params.set("from", from);
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    router.replace(`/service?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleView = (item: ServiceCategory) => {
    const page = item.category_page || "services";
    router.push(`/service/${page}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Home", page: "/" }, { label: "Categories" }]}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="Government Services"
          description="Browse government services by category"
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
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} categories
        </p>

        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No services found.
            </div>
          ) : (
            paginated.map((item) => (
              <div key={item.category} className="h-full">
                <ServiceCard
                  name={item.category}
                  description={`${item.count} service${
                    item.count !== 1 ? "s" : ""
                  } available`}
                  category={item.category}
                  onClick={() => handleView(item)}
                />
              </div>
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