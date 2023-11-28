import React from 'react';
import { styled } from 'styled-components';

import { mediaConfined, mediaWide, space3XL } from '@smartcoorp/ui/tokens';

const Col = styled.div<{ $cols?: number }>`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;

  @media ${mediaConfined} {
    gap: ${space3XL};
    /* width: 110%;
    margin-left: -5%; */
    flex-direction: row;
    padding-top: ${space3XL};
  }

  @media ${mediaWide} {
    /* width: 120%;
    margin-left: -10%; */
  }

  &:first-child {
    padding-top: 0;
  }
`;

const ColumnContainer = styled.div<{ $distribution?: number }>`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  @media ${mediaConfined} {
    flex-grow: ${({ $distribution }) => $distribution ?? 1};
  }
`;

export const Column = ({
  children,
  columns,
  distribution,
}: {
  columns: number;
  children: React.ReactNode;
  distribution?: number[];
}) => {
  return (
    <Col $cols={columns}>
      {React.Children.map(children, (child, index) => (
        <ColumnContainer $distribution={distribution?.[index]}>
          {child}
        </ColumnContainer>
      ))}
    </Col>
  );
};
