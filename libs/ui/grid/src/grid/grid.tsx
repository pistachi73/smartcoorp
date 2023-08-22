import { FC } from 'react';

import { GridRuler } from '../grid-ruler';

import { Styled } from './grid.styles';
import { GridProps } from './grid.types';

export const Grid: FC<GridProps> = ({
  children,
  gridRuler = false,
  className,
}) => {
  if (gridRuler) {
    return (
      <div className={className} style={{ position: 'relative' }}>
        <GridRuler />
        <Styled.Grid className={className}>{children}</Styled.Grid>
      </div>
    );
  }
  return <Styled.Grid className={className}>{children}</Styled.Grid>;
};

Grid.displayName = 'Grid';
