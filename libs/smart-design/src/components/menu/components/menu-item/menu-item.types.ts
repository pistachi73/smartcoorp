import { Styled } from './menu-item.styles';

export type MenuItemProps = React.ComponentProps<typeof Styled.MenuItem> & {
  /** Menu popover header title */
  children: React.ReactNode;
  /** Custom Style */
  className?: string;
  /** Is item disabled */
  disabled?: boolean;
};
