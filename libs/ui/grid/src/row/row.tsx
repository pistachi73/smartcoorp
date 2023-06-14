import React from 'react';

import { Row as StyledRow } from './row.styles';
import { RowProps } from './row.types';

export const Row: React.FC<RowProps> = ({ children, className, noMargin }) => {
  return (
    <StyledRow className={className} $noMargin={noMargin}>
      {children}
    </StyledRow>
  );
};
