'use client';

import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { z } from 'zod';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DebounceFormField } from '@smartcoorp/ui/form-field';

import { FiltersContainer, SearchContainer } from './filters.styles';

const FiltersSchema = z.object({
  search: z.string().optional(),
});

type FiltersData = z.infer<typeof FiltersSchema>;

export const Filters = () => {
  const [search, setSearch] = useState<FiltersData['search']>('');
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSearchChange = (value: string) => {
    setSearch(value);

    if (value) {
      const newParams = new URLSearchParams(params.toString());
      newParams.set('title', value);
      router.push(`${pathname}?${newParams.toString()}`, {});
    } else {
      router.push(`${pathname}`);
    }
  };

  return (
    <FiltersContainer>
      <SearchContainer>
        <DebounceFormField
          value={search}
          onChange={onSearchChange}
          icon={BsSearch}
          placeholder="Search by title"
        />
      </SearchContainer>
    </FiltersContainer>
  );
};
