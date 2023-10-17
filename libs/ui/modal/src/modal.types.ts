import * as DialogPrimitives from '@radix-ui/react-dialog';

export type ModalControl =
  // Controlled Modal
  | {
      /** The controlled open state of the dialog. Must be used in conjunction with **onOpenChange**. */
      open: boolean;
      /** Event handler called when the open state of the dialog changes. */
      onOpenChange: (open: boolean) => void;
    }
  // Uncontrolled Modal
  | { open?: never; onOpenChange?: never };

export type ModalRootProps = ModalControl & { children: React.ReactNode };

export type ModalContentProps = {
  /** Custom styles */
  className?: string;
  /** Content of the modal */
  children: React.ReactNode;
  /** An accessible title to be announced when the dialog is opened.  */
  title: string;
  /** An accessible description to be announced when the dialog is opened. */
  description: string;
  /** Show close icon */
  closeIcon?: boolean;
  /**Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component. It can be prevented by calling **event.preventDefault**. */
  onPointerDownOutside?: DialogPrimitives.DialogContentProps['onPointerDownOutside'];
};
