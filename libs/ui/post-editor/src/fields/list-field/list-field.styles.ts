import styled from 'styled-components';

import { spaceXL, spaceXS, spaceXXS } from '@smartcoorp/ui/tokens';

export const OrderedList = styled.ol`
  padding-left: ${spaceXL};

  margin-top: 0;
  margin-bottom: 0;
  overflow-wrap: anywhere;

  :focus {
    outline: none;
  }
`;

export const UnorderedList = styled.ul`
  padding-left: ${spaceXL};

  margin-top: 0;
  margin-bottom: 0;
  overflow-wrap: anywhere;

  :focus {
    outline: none;
  }
`;

export const ListItem = styled.li`
  padding: ${spaceXXS} ${spaceXS};
`;
