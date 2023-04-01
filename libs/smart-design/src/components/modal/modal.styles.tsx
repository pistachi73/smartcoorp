import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { focusRing } from '../../styles';
import {
  borderRadiusS,
  borderRadiusXS,
  mediaConfined,
  mediaSmall,
  motionEasingEnter,
  motionTimeM,
  primary,
  scale320,
  scale420,
  spaceM,
  spaceXL,
  spaceXS,
} from '../../tokens';

const ModalOverlay = styled(motion(Dialog.Overlay))`
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  position: fixed;
  inset: 0;
`;

const ModalContent = styled(motion(Dialog.Content))`
  padding: ${spaceXL};
  min-height: ${scale320};
  max-height: 60vh;
  width: 90%;

  max-width: ${scale420};

  background-color: ${({ theme }) => theme.backgroundScreen};

  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};

  position: fixed;
  top: 50%;
  left: 50%;

  @media ${mediaSmall} {
    min-width: 450px;
    max-width: 500px;
  }

  @media ${mediaConfined} {
    min-width: 450px;
    max-width: 600px;
  }
`;

export const ModalCloseIcon = styled(Dialog.Close)`
  padding: ${spaceXS};
  color: ${({ theme }) => theme.color.neutral};

  position: absolute;
  top: ${spaceM};
  right: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};

  transition: box-shadow ${motionTimeM} ${motionEasingEnter};

  ${focusRing({ color: primary })}
`;

export const Styled = {
  ModalCloseIcon,
  ModalOverlay,
  ModalContent,
};
