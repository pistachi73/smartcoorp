import { ButtonProps } from '../button/button.types';
export type MenuProps = {
  /** Add custom css to select */
  className?: string;
  /** Id for the Menu */
  id: string;
  /** Content of the menu. */
  children: React.ReactNode;
  /** Trigger button component props */
  triggerProps?: ButtonProps;
  /** Trigger render text*/
  triggerText?: string;
};
