export type ClickOutsideProps = {
  /** Content of the Click outside Component */
  children: React.ReactNode;
  /** Outside of component click callback */
  callback: any;
  /** Id of the component */
  id: string;
  /** Include custom styles */
  className?: string;
};
