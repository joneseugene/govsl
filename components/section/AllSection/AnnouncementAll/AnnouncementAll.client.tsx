"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HomeSection } from "@/components/ui/HomeSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Search2 } from "@/components/ui/SearchUI2";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { Pagination } from "@/components/ui/PaginationUI";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tabs } from "@/components/ui/TabUI";
import { useDebounce } from "@/libs/hook/useDebounce";
import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementInterface } from "@/libs/interface/announcements.interface";

type MinistryOption = {
  id: string;
  name: string;
};

interface AllAnnouncementClientProps {
  currentPage: number;
  search?: string;
  ministryId?: string;
  category?: string;
  announcements: AnnouncementInterface[];
  total: number;
  ministries: MinistryOption[];
}

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "vacancy", label: "Vacancy" },
  { value: "notice", label: "Notice" },
  { value: "event", label: "Event" },
];

export default function AllAnnouncementClient({
  currentPage,
  search,
  ministryId,
  category,
  announcements,
  total,
  ministries,
}: AllAnnouncementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? "all");
  const [selectedCategory, setSelectedCategory] = useState(category ?? "all");

  const debouncedSearch = useDebounce(searchQuery, 500);

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

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    router.replace(`/announcement?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedMinistry, selectedCategory, router, from]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (from) {
      params.set("from", from);
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    if (selectedMinistry !== "all") {
      params.set("ministryId", selectedMinistry);
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    router.replace(`/announcement?${params.toString()}`, {
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
          items={[{ label: "Home", page: "/" }, { label: "Announcements" }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="Official Announcements"
          description="Official government announcements and public notices"
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

        <div className="mb-8">
          <Tabs
            label="Categories"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={CATEGORY_OPTIONS}
          />
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {announcements.length} of {total} announcements
        </p>

        <div className="space-y-5">
          {announcements.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching announcements found.
            </div>
          ) : (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                item={announcement}
                onNavigate={(path) => router.push(path)}
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