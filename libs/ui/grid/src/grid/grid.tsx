import { GridRuler } from '../grid-ruler';

import { GridContainer } from './grid.styles';
import { GridProps } from './grid.types';

export const Grid = ({ children, gridRuler = false, className }: GridProps) => {
  if (gridRuler) {
    return (
      <div
        className={className}
        style={{ position: 'relative', width: '100%' }}
      >
        <GridRuler />
        <GridContainer className={className}>{children}</GridContainer>
      </div>
    );
  }
  return <GridContainer className={className}>{children}</GridContainer>;
};

Grid.displayName = 'Grid';
