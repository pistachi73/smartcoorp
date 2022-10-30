import { Styled } from './modal.styles';

export type ModalProps = React.ComponentProps<typeof Styled.ModalContainer> & {
  /** Content of the modal */
  children: React.ReactNode;
  /** Add custom css to modal */
  className?: string;
  /** Shows or hides the modal */
  show: boolean;
  /** Show close icon */
  closeIcon?: boolean;
  /** Modal ARIA description */
  modalDescription: string;
  /** Root id of the portal where the modal is going to be rendered*/
  rootId: string;
  /** Callback executed when modal is closed bia closeIcon */
  onClose?: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement | undefined
  >;
  /** Callback executed when modal background is clicked */
  onBackgroundClick?: React.MouseEventHandler<HTMLDivElement | undefined>;
};
