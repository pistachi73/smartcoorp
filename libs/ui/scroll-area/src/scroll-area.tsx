import React from 'react';

import * as S from './scroll-area.styles';
import type { ScrollAreaProps } from './scroll-area.types';

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  maxHeight,
  className,
  scrollHideDelay = 600,
  type = 'hover',
}) => {
  return (
    <S.ScrollAreaRoot
      className={className}
      type={type}
      scrollHideDelay={scrollHideDelay}
    >
      <S.ScrollAreaViewport $maxHeight={maxHeight}>
        {children}
      </S.ScrollAreaViewport>
      <S.ScrollAreaScrollbar orientation="vertical">
        <S.ScrollAreaThumb />
      </S.ScrollAreaScrollbar>
      <S.ScrollAreaScrollbar orientation="horizontal">
        <S.ScrollAreaThumb />
      </S.ScrollAreaScrollbar>
      <S.ScrollAreaCorner />
    </S.ScrollAreaRoot>
  );
};
