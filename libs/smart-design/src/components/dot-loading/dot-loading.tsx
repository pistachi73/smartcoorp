import React, { FC } from 'react';

import { Styled } from './dot-loading.styles';
import { DotLoadingProps } from './dot-loading.types';

export const DotLoading: FC<DotLoadingProps> = ({
  size = 'medium',
  disabled,
}) => {
  return (
    <Styled.Loader $size={size} data-testid="dot-loading">
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
    </Styled.Loader>
  );
};

DotLoading.displayName = 'DotLoading';
