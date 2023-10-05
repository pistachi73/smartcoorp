'use client';

import styled from 'styled-components';

import { mediaSmall, spaceXL } from '@smartcoorp/ui/tokens';

export const FiltersContainer = styled.div`
  margin-bottom: ${spaceXL};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  width: 100%;
  min-width: 300px;

  @media ${mediaSmall} {
    width: 30%;
  }
`;
