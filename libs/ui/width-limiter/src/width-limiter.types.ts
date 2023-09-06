export type WidthLimiterProps = {
  /** Content of the Container */
  children: React.ReactNode;
  /** Add custom css to component */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
