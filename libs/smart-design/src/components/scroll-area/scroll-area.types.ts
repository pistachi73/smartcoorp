import * as ScrollArea from '@radix-ui/react-scroll-area';

type ScrollAreaRootProps = React.ComponentProps<typeof ScrollArea.Root>;
export type ScrollAreaProps = {
  /** The content of the scroll area. */
  children: React.ReactNode;
  /** Scroll area height */
  maxHeight: number;
  /** Custom styles */
  className?: string;
  /**Describes the nature of scrollbar visibility, similar to how the scrollbar preferences in MacOS control visibility of native scrollbars. */
  type?: ScrollAreaRootProps['type'];
  /**If type is set to either "scroll" or "hover", this prop determines the length of time, in milliseconds, before the scrollbars are hidden after the user stops interacting with scrollbars. */
  scrollHideDelay?: ScrollAreaRootProps['scrollHideDelay'];
};
