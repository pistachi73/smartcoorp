export type StyleMeasure =
  | `${number}px`
  | `${number}%`
  | `${number}rem`
  | `${number}em`;

export type SkeletonProps = {
  /** Custom css */
  className?: string;
  /** Number of skeletons */
  number?: number;
  width?: StyleMeasure;
  height?: StyleMeasure;
  children?: React.ReactNode;
};
