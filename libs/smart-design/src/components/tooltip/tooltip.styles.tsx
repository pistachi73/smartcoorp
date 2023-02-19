import * as Tooltip from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { borderRadiusXS, spaceS } from '../../tokens/';

export const TooltipContet = styled(motion(Tooltip.Content))`
  padding: ${spaceS};
  border-radius: ${borderRadiusXS};

  background-color: ${({ theme }) => theme.tooltip.contentBackgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};

  user-select: none;
  & p {
    color: ${({ theme }) => theme.tooltip.contentParagraphColor};
  }
  & span {
    color: ${({ theme }) => theme.tooltip.contentSpanColor};
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.tooltip.contentHeadingColor};
  }
`;

export const TooltipArow = styled(Tooltip.Arrow)`
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  fill: ${({ theme }) => theme.tooltip.contentBackgroundColor};
`;
