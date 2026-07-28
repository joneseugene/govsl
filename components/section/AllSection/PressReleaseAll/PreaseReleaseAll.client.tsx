"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { HomeSection } from "@/components/ui/HomeSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Search2 } from "@/components/ui/SearchUI2";
import { PressReleaseAllCard } from "@/components/section/AllSection/PressReleaseAll/PressReleaseAllCard";
import { Pagination } from "@/components/ui/PaginationUI";
import { useDebounce } from "@/libs/hook/useDebounce";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PressReleaseInterface } from "@/libs/interface/press.releases.interface";

type MinistryOption = {
  id: string;
  name: string;
};

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
  releases: PressReleaseInterface[];
  total: number;
  ministries: MinistryOption[];
};

export default function PressReleasesAllClient({
  currentPage,
  search,
  ministryId,
  releases,
  total,
  ministries,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? "all");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const from = searchParams.get("from");

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace("/");
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  const ministryOptions = useMemo(() => {
    return [
      { value: "all", label: "All Ministries" },
      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

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

    router.replace(`/press-release?${params.toString()}`, {
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

    router.replace(`/press-release?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Home", page: "/" }, { label: "Press Releases" }]}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="Press Releases"
          description="Official communications from the Government of Sierra Leone"
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
          Showing {releases.length} of {total} results
        </p>

        <div className="space-y-5">
          {releases.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No press releases found.
            </div>
          ) : (
            releases.map((release) => (
              <PressReleaseAllCard key={release.id} release={release} />
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