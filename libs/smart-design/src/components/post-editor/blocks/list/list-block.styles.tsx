import styled from 'styled-components';

import { spaceS, spaceXS } from '../../../../tokens/spacing';

export const OrderedList = styled.ol<{ $empty?: boolean }>`
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
  padding: ${spaceXS} ${spaceS};
`;
