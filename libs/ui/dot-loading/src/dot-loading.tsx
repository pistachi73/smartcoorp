'use client';

import { Styled } from './dot-loading.styles';
import { DotLoadingProps } from './dot-loading.types';

export const DotLoading = ({
  size = 'medium',
  disabled,
  className,
}: DotLoadingProps) => {
  return (
    <Styled.Loader $size={size} data-cy="dot-loading" className={className}>
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
      <Styled.LoaderDot $size={size} $disabled={disabled} />
    </Styled.Loader>
  );
};

DotLoading.displayName = 'DotLoading';
