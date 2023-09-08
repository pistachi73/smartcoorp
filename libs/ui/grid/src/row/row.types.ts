import { Row } from './row.styles';

export type RowProps = React.ComponentProps<typeof Row> & {
  /** Content of the row (col) */
  children: React.ReactNode;
  /** Custom css className */
  className?: string;
  /** Remove margin-bottom from row */
  noMargin?: boolean;
  /** The gap spacing of the gap on mobile screens or larger */
  gap?: `${string}px`;
  /** The gap spacing of the gap on tablet screens or larger */
  gapConfined?: `${string}px`;
  /** The gap spacing of the gap on desktop screens or larger */
  gapWide?: `${string}px`;
};
