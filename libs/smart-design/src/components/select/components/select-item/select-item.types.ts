import { Styled, sizes } from './select-item.styles';

export type SelectItemSizes = keyof typeof sizes;

export type SelectItemProps = React.ComponentProps<typeof Styled.SelectItem> & {
  /** Select item content */
  children?: React.ReactNode;
  /** Custom css classname */
  className?: string;
  /** Is multiple Select item */
  multiple?: boolean;
  /** Is Selected Item selected */
  selected: boolean;
  /** Is at least one item selected */
  semiSelected?: boolean;
  /** The size on mobile screens or larger */
  size?: SelectItemSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SelectItemSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SelectItemSizes;
};
