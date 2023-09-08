import React from 'react';

import { ColProps } from '../col/col.types';

import { Row as StyledRow } from './row.styles';
import { RowProps } from './row.types';

export const Row: React.FC<RowProps> = ({
  children,
  className,
  noMargin,
  gap,
  gapConfined,
  gapWide,
}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<ColProps>(child)) return;

    return React.cloneElement(child, {
      gap,
      gapConfined,
      gapWide,
    });
  });

  return (
    <StyledRow
      className={className}
      $noMargin={noMargin}
      $gap={gap}
      $gapConfined={gapConfined}
      $gapWide={gapWide}
    >
      {childrenWithProps}
    </StyledRow>
  );
};
