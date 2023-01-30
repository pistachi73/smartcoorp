import React from 'react';
import styled from 'styled-components';

import { ColumnBlockProps } from '../blocks.types';

const Col = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols}, 1fr)`};
  gap: 20px;
`;

export const Column = React.memo<ColumnBlockProps>(
  ({ chains, children, columns }) => {
    return <Col $cols={columns}>{children}</Col>;
  }
);
