import React from 'react';

import { WidthLimiter } from '../../width-limiter';
import { Grid } from '../grid';

import { ContainedGridProps } from './contained-grid.types';

export const ContainedGrid: React.FC<ContainedGridProps> = ({
  children,
  className,
  gridRuler,
}) => {
  return (
    <WidthLimiter className={className}>
      <Grid gridRuler={gridRuler}>{children}</Grid>
    </WidthLimiter>
  );
};

ContainedGrid.displayName = 'ContainedGrid';
