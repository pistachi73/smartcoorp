import * as DialogAlertPrimitives from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import {
  borderRadiusS,
  scale170,
  scale280,
  scale420,
  spaceL,
  spaceM,
  spaceXL,
} from '@smartcoorp/ui/tokens';

type DialogActionsContainerTransientProps = {
  $cancelLabel?: boolean;
};

const DialogContent = styled(motion(DialogAlertPrimitives.AlertDialogContent))`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${scale280};
  max-width: ${scale420};
  padding: ${spaceXL};
  min-height: ${scale170};
  max-height: 60vh;
  width: 90%;
  z-index: 9999;

  background-color: ${({ theme }) => theme.backgroundScreen};

  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};

  position: fixed;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DialogOverlay = styled(motion(DialogAlertPrimitives.Overlay))`
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  position: fixed;
  z-index: 30;
  inset: 0;
`;
const DialogActionsContainer = styled.div<DialogActionsContainerTransientProps>`
  display: flex;
  align-items: center;

  gap: ${spaceM};

  ${({ $cancelLabel }) =>
    $cancelLabel
      ? css`
          width: 100%;
          justify-content: space-between;
        `
      : css`
          width: 50%;
          margin: 0 auto;
        `};

  padding-top: ${spaceL};
`;

const DialogActionButton = styled(DialogAlertPrimitives.Action)`
  width: 100%;
`;

export const Styled = {
  DialogOverlay,
  DialogContent,
  DialogActionsContainer,
  DialogActionButton,
};
