import { ButtonSizes } from '../button/button.types';

type CancelProps =
  | {
      /**  Callback executed on dialog rejection */
      // eslint-disable-next-line @typescript-eslint/ban-types
      onCancel?: React.HTMLProps<HTMLButtonElement>['onClick'];
      /** Label for the reject button */
      cancelLabel: string;
    }
  | {
      /**  Callback executed on dialog rejection */
      onCancel?: never;
      /** Label for the reject button */
      cancelLabel?: never;
    };

type ActionProps = {
  /**  Callback executed on dialog action */
  // eslint-disable-next-line @typescript-eslint/ban-types
  onAction?: React.HTMLProps<HTMLButtonElement>['onClick'];
  /** Label for the action button */
  actionLabel: string;
};

export type DialogControl =
  // Controlled Modal
  | {
      /** The controlled open state of the dialog. Must be used in conjunction with **onOpenChange**. */
      open: boolean;
      /** Event handler called when the open state of the dialog changes. */
      onOpenChange: (open: boolean) => void;
    }
  // Uncontrolled Modal
  | { open?: never; onOpenChange?: never };

export type DialoglRootProps = DialogControl & {
  /** Content of the modal */
  children: React.ReactNode;
};

export type DialogContentProps = CancelProps &
  ActionProps & {
    /** Content of the modal */
    children: React.ReactNode;
    /** An accessible title to be announced when the dialog is opened.  */
    title: string;
    /** An accessible description to be announced when the dialog is opened. */
    description: string;
    /** Is Dialog confirm action loading (async) */
    loading?: boolean;
    /** Is dialog confirm action disabled */
    disabled?: boolean;
    /** The size of the buttons on mobile screens or larger */
    size?: ButtonSizes;
    /** The size of the buttons on tablet screens or larger */
    sizeConfined?: ButtonSizes;
    /** The size of the buttons on desktop screens or larger */
    sizeWide?: ButtonSizes;
  };
