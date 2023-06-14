import { Styled } from './grid.styles';

export type GridProps = React.ComponentProps<typeof Styled.Grid> & {
  /** Content of the Grid */
  children: React.ReactNode;
  /** Custom classnames css */
  className?: string;
  /** Include grid ruler for visual positioning of the columns */
  gridRuler?: boolean;
};
