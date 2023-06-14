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
      <div style={{ position: 'relative' }}>
        <GridRuler />
        <Styled.Grid>{children}</Styled.Grid>
      </div>
    );
  }
  return <Styled.Grid className={className}>{children}</Styled.Grid>;
};

Grid.displayName = 'Grid';
