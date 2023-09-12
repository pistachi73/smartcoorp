'use client';

import { styled } from 'styled-components';

import {
  gray100,
  mediaConfined,
  space3XL,
  space4XL,
} from '@smartcoorp/ui/tokens';

export const SectionContainer = styled.section`
  padding-block: ${space3XL};

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${gray100};

  @media ${mediaConfined} {
    padding-block: ${space4XL};
  }
`;
