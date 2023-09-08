export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Content of the Grid */
  children: React.ReactNode;
  /** Custom classnames css */
  className?: string;
  /** Include grid ruler for visual positioning of the columns */
  gridRuler?: boolean;
};
