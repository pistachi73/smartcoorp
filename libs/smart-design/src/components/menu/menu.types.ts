import { ButtonProps } from '../button/button.types';
export type MenuProps = {
  /** Add custom css to select */
  className?: string;
  /** Id for the Menu */
  id: string;
  /** Content of the menu. */
  children: React.ReactNode;
  /** Is Menu opened */
  isOpen: boolean;
  /** Close Menu callback */
  closeMenu: () => void;
  /** Toggle Menu Callback */
  toggleMenu: () => void;
  /** Enable Arrows Key Navigation with refs */
  refs?: any;
  /** Trigger button component props */
  triggerProps?: ButtonProps;
  /** Trigger render text*/
  triggerText?: string;
  /** Callback when item is clicked */
};
