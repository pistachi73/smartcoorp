import { FC } from 'react';

import { Styled } from './dialog.styles';
import { DialogProps } from './dialog.types';

export const Dialog: FC<DialogProps> = ({
  children,
  className,
  show,
  onClose,
  onBackgroundClick,
  rootId,
  modalDescription,
  loading,
  disabled,
  closeIcon,
  onConfirm,
  onReject,
  confirmLabel,
  rejectLabel,
  size = 'medium',
  sizeConfined,
  sizeWide,
}) => {
  return (
    <Styled.DialogContainer
      className={className}
      rootId={rootId}
      modalDescription={modalDescription}
      show={show}
      onClose={!loading ? onClose : undefined}
      onBackgroundClick={!loading ? onBackgroundClick : undefined}
      closeIcon={closeIcon}
    >
      {children}
      <Styled.DialogActionsContainer $rejectOption={Boolean(rejectLabel)}>
        {rejectLabel && (
          <Styled.DialogActionButton
            disabled={disabled || loading}
            variant="secondary"
            onClick={onReject}
            size={size}
            sizeConfined={sizeConfined}
            sizeWide={sizeWide}
          >
            {rejectLabel}
          </Styled.DialogActionButton>
        )}
        <Styled.DialogActionButton
          loading={loading}
          disabled={disabled || loading}
          variant="primary"
          onClick={onConfirm}
          size={size}
          sizeConfined={sizeConfined}
          sizeWide={sizeWide}
        >
          {confirmLabel}
        </Styled.DialogActionButton>
      </Styled.DialogActionsContainer>
    </Styled.DialogContainer>
  );
};

Dialog.displayName = 'Dialog';
