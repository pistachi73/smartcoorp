'use client';

import { styled } from 'styled-components';

import { Grid } from '@smartcoorp/ui/grid';
import {
  borderRadiusS,
  gray700,
  mediaConfined,
  mediaSmall,
  primary,
  primary100,
  scale110,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const Wrapper = styled(Grid)`
  max-width: 800px;
  padding: ${spaceM};
  margin: 0 auto;

  /* gap: ${spaceXL}; */

  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow.shadowL};
  border-radius: ${borderRadiusS};

  /* @media ${mediaSmall} {
    flex-direction: row;
  } */
`;

export const PricingWrapper = styled.div`
  height: 100%;
  padding: ${spaceXL};
  padding: ${spaceXL};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${primary100};
  border-radius: ${borderRadiusS};

  gap: ${spaceL};
  text-align: center;

  .dark-neutral {
    color: ${gray700};
  }
`;

export const SnippetsWrapper = styled.div`
  padding-inline: ${spaceM};
  padding-block: ${spaceXL};

  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: ${spaceXXL};

  > div {
    display: flex;
    gap: ${spaceM};
    > p {
      display: block;
    }
  }
`;

export const SnippetIcon = styled.div`
  width: ${scale110};
  height: ${scale110};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${primary};
`;
