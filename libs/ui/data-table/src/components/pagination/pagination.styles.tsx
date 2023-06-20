import styled from 'styled-components';

import { spaceS } from '@smartcoorp/ui/tokens';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: ${spaceS};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: ${spaceS};
`;

export const Styled = {
  Container,
  PaginationContainer,
};
