import styled from 'styled-components';

import { spaceXS, spaceXXS } from '@smartcoorp/smart-design/tokens';

export const OrderedList = styled.ol`
  margin-top: 0;
  margin-bottom: 0;
  :focus {
    outline: none;
  }
`;

export const UnorderedList = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  :focus {
    outline: none;
  }
`;

export const ListItem = styled.li`
  padding: ${spaceXXS} ${spaceXS};
`;
