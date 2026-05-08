'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Search from '@/components/ui/SearchUI';
import { Suggestion } from '@/libs/interface/searchInterface';
import { getSearchSuggestions } from '@/libs/api/global.search.api';

export default function HeroSectionClient() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * AUTOCOMPLETE (debounced)
   */
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const q = query.trim();

      if (q.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        const data = await getSearchSuggestions(q);
        setSuggestions(data);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  /**
   * FULL SEARCH
   */
  const handleSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  /**
   * 🧠 SELECT SUGGESTION
   */
  const handleSelect = (item: Suggestion) => {
    if (item.link) {
      router.push(item.link);
    } else {
      router.push(`/search?q=${encodeURIComponent(item.title)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto md:mx-0">
      <Search
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        onSelect={handleSelect}
        suggestions={suggestions}
        isLoading={loading}
        placeholder="Search government services, news, policies..."
      />
    </div>
  );
}
