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
import { MDAInterface } from "@/libs/interface/mda/mdas.interface";
import { MDACard } from "./MdaCard";

type Props = {
  currentPage: number;
  search?: string;
  type?: string;
  acronym?: string;
  mdas: MDAInterface[];
};

export default function AllMDAClient({
  currentPage,
  search,
  type,
  acronym,
  mdas,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const [selectedType, setSelectedType] = useState(type ?? "all");

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
    const a = acronym?.toLowerCase();

    return mdas.filter((mda) => {
      const matchesSearch =
        mda.name.toLowerCase().includes(q) ||
        mda.acronym?.toLowerCase().includes(q) ||
        mda.type?.toLowerCase().includes(q);

      const matchesType = selectedType === "all" || mda.type === selectedType;
      const matchesAcronym = !a || mda.acronym?.toLowerCase() === a;

      return matchesSearch && matchesType && matchesAcronym;
    });
  }, [mdas, searchQuery, selectedType, acronym]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "Ministry", label: "Ministry" },
    { value: "Department", label: "Department" },
    { value: "Agency", label: "Agency" },
  ];

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (from) {
      params.set("from", from);
    }

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (selectedType !== "all") {
      params.set("type", selectedType);
    }

    if (acronym) {
      params.set("acronym", acronym);
    }

    router.replace(`/mda?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedType, acronym, router, from]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (from) {
      params.set("from", from);
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    if (selectedType !== "all") {
      params.set("type", selectedType);
    }

    if (acronym) {
      params.set("acronym", acronym);
    }

    router.replace(`/mda?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleView = (mda: MDAInterface) => {
    router.push(`/mda/${mda.id}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Home", page: "/" }, { label: "MDAs" }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          description="Browse government MDAs of Sierra Leone"
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
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} MDAs
        </p>

        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching MDAs found.
            </div>
          ) : (
            paginated.map((mda) => (
              <div key={mda.id} className="h-full">
                <MDACard name={mda.name} onViewClick={() => handleView(mda)} />
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