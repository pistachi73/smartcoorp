import { Row } from './row.styles';

export type RowProps = React.ComponentProps<typeof Row> & {
  /** Content of the row (col) */
  children: React.ReactNode;
  /** Custom css className */
  className?: string;
  /** Remove margin-bottom from row */
  noMargin?: boolean;
};
