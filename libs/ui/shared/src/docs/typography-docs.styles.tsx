import styled from 'styled-components';

import { scale160, space4XL, spaceM } from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  width: 100%;
`;
export const PropContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${space4XL};
  padding: ${spaceM} 0;
`;
export const TypeContainer = styled.div`
  width: ${scale160};
`;

export const TypographyDocs = {
  Container,
  PropContainer,
  TypeContainer,
};
