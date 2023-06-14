import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import {
  borderRadiusS,
  scale030,
  scale070,
  scale150,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

export const InlineToolsContainer = styled(motion.ul)`
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 2000;

  display: flex;
  flex-direction: column;

  transform-origin: top left;

  background-color: ${({ theme }) => theme.backgroundScreen};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border: 1px solid ${({ theme }) => theme.common.overBackgroundNeutral};

  overflow: hidden;
  /* overflow-y: scroll; */
`;

export const FlexRow = styled.div<{ $isLinkToolOpen?: boolean }>`
  display: flex;
  flex-direction: row;

  ${({ $isLinkToolOpen }) =>
    $isLinkToolOpen &&
    css`
      border-bottom: 1px solid;
      border-color: ${({ theme }) => theme.common.disabledBackgroundColor};
    `}
`;

export const InlineTool = styled.button`
  padding: ${scale030};
  width: ${scale150};
  height: ${scale150};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.neutral};

  &:hover {
    background: ${({ theme }) => theme.menu.menuItem.hoverBackgroundColor};
  }
`;

export const LinkInput = styled.div`
  padding: ${spaceS} ${spaceM};
  height: 42px;
  display: flex;
  align-items: center;
  font-size: ${scale070};
  position: relative;
  top: 100%;
  left: 0;

  :empty:not(:focus):before {
    content: attr(data-ph);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;
