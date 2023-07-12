import React from 'react';
import { v4 as uuid } from 'uuid';

import { StyledSkeleton } from './skeleton.styles';
import type { SkeletonProps } from './skeleton.types';

export const Skeleton = ({
  className,
  children,
  width,
  height,
  number = 1,
}: SkeletonProps) => {
  const id = uuid();
  return children ? (
    <StyledSkeleton className={className}>
      <div style={{ opacity: 0 }}>{children}</div>
    </StyledSkeleton>
  ) : (
    <>
      {Array.from({ length: number }, (_, index) => (
        <StyledSkeleton
          className={className}
          key={`${id}_${index}`}
          $width={width}
          $height={height}
        />
      ))}
    </>
  );
};
