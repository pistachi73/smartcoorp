import * as DialogP from '@radix-ui/react-dialog';
import { FC } from 'react';

import { Styled } from './dialog.styles';
import { DialogProps } from './dialog.types';

export const Dialog: FC<DialogProps> = ({
  children,
  loading,
  disabled,
  onReject,
  confirmLabel,
  rejectLabel,
  size = 'medium',
  sizeConfined,
  sizeWide,
}) => {
  return (
    <Styled.DialogContainer>
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
