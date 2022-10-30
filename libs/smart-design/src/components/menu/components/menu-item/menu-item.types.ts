import { Styled } from "./menu-item.styles";

export type MenuItemProps = React.ComponentProps<typeof Styled.MenuItem> & {
  /** Menu popover header title */
  children: React.ReactNode;
  /** To href for the item */
  to: string;
  /** Is item disabled */
  disabled?: boolean;
};
