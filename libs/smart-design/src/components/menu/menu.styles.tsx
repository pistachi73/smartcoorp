import { motion } from 'framer-motion';
import styled from 'styled-components';

import { borderRadiusS, scale350, spaceM, spaceS } from '../../tokens';

const MenuWrapper = styled.div`
  position: relative;
`;
const MenuContainer = styled(motion.ul)`
  width: ${scale350};
  margin: 0;
  padding: ${spaceM} 0;

  position: absolute;
  left: 0;
  top: calc(100% + ${spaceS});
  z-index: 2000;

  transform-origin: top left;

  background-color: ${({ theme }) => theme.backgroundScreen};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border: 1px solid ${({ theme }) => theme.common.overBackgroundNeutral};

  overflow: hidden;
`;

export const Styled = {
  MenuWrapper,
  MenuContainer,
};
