'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { z } from 'zod';

import { DebounceFormField } from '@smartcoorp/ui/form-field';

import { FiltersContainer, SearchContainer } from './filters.styles';

const FiltersSchema = z.object({
  search: z.string().optional(),
});

type FiltersData = z.infer<typeof FiltersSchema>;

export const Filters = () => {
  const [search, setSearch] = useState<FiltersData['search']>('');

  const onSearchChange = (value: string) => {
    setSearch(value);

    console.log('Hola');
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
