import styled from 'styled-components';

import { spaceL, spaceM, spaceXL, spaceXXL } from '@smartcoorp/ui/tokens';

export const TabLabelContainer = styled.div`
  /* gap: ${spaceM}; */
`;

export const Header = styled.div`
  margin-bottom: ${spaceXL};

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: ${spaceM};
  }
`;

export const PostInformationContainer = styled.div`
  max-width: 868px;
  margin: 0 auto;
  padding-block: ${spaceL};

  display: grid;
  grid-template-columns: 1fr 2fr;

  row-gap: ${spaceL};
  column-gap: ${spaceXXL};
`;
