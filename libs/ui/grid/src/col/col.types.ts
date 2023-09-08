export type ColSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type ColProps = {
  /** Content of the col  */
  children: React.ReactNode;
  /** Custom classnames css */
  className?: string;
  /** The size on mobile screens or larger (1 - 12 columns) */
  size: ColSizes;
  /** The size on tablet screens or larger (1 - 12 columns) */
  sizeConfined?: ColSizes;
  /** The size on desktop screens or larger (1 - 12 columns) */
  sizeWide?: ColSizes;
  /** The offset of the column on mobile screens or larger (1 - 12 columns) */
  offset?: ColOffset;
  /** The offset of the column on tablet screens or larger (1 - 12 columns) */
  offsetConfined?: ColOffset;
  /** The offset of the column on desktop screens or larger (1 - 12 columns) */
  offsetWide?: ColOffset;
  /** The gap spacing of the gap on mobile screens or larger */
  gap?: `${string}px`;
  /** The gap spacing of the gap on tablet screens or larger */
  gapConfined?: `${string}px`;
  /** The gap spacing of the gap on desktop screens or larger */
  gapWide?: `${string}px`;
};
