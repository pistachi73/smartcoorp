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

const ModalBackground = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: auto;

  background-color: ${({ theme }) => theme.modal.backgroundColor};
`;

export const ModalContainer = styled(motion.div)`
  padding: ${spaceXL};
  min-height: ${scale320};
  max-height: 60vh;
  width: 90%;

  max-width: ${scale420};

  position: relative;

  background-color: ${({ theme }) => theme.backgroundScreen};

  border-radius: ${borderRadiusS};

  @media ${mediaSmall} {
    min-width: 450px;
    max-width: 500px;
  }

  @media ${mediaConfined} {
    min-width: 450px;
    max-width: 600px;
  }
`;

export const ModalCloseIcon = styled.button`
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
  ModalBackground,
  ModalContainer,
  ModalCloseIcon,
};
