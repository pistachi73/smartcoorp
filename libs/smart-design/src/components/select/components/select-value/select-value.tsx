import React from 'react';

import { Value, ValueContainer } from './select-value.styles';
import { SelectValueProps } from './select-value.types';

export const SelectValue: React.FC<SelectValueProps> = ({
  children,
  id,
  disabled,
  size,
  sizeConfined,
  sizeWide,
  ...props
}) => {
  return (
    <ValueContainer
      $size={size}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      id={id}
      data-testid="select-value-container"
      disabled={disabled}
      {...props}
    >
      <Value>{children}</Value>
    </ValueContainer>
  );
};
