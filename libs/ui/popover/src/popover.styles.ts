'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import styled from 'styled-components';

import {
  motionEasingEnter,
  motionTimeM,
  slideUpAndFadeIn,
} from '@smartcoorp/ui/tokens';

export const Content = styled(PopoverPrimitive.Content)`
  animation-duration: ${motionTimeM};
  animation-timing-function: ${motionEasingEnter};
  will-change: transform, opacity;
  animation-name: ${slideUpAndFadeIn};
  z-index: 9999;
`;

export const Styled = { Content };
