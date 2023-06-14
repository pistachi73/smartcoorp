import { FC } from 'react';

import { Col as StyledCol } from './col.styles';
import { ColProps } from './col.types';

export const Col: FC<ColProps> = ({
  children,
  className,
  size,
  sizeConfined,
  sizeWide,
  offset,
  offsetConfined,
  offsetWide,
}) => {
  return (
    <StyledCol
      className={className}
      $size={size}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      $offset={offset}
      $offsetConfined={offsetConfined}
      $offsetWide={offsetWide}
    >
      {children}
    </StyledCol>
  );
};
