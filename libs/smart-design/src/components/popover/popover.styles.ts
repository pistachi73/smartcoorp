import * as PopoverPrimitive from '@radix-ui/react-popover';
import styled from 'styled-components';

import { slideUpAndFadeIn } from '../../tokens/animations';
import { motionEasingEnter, motionTimeM } from '../../tokens/motion';

export const Content = styled(PopoverPrimitive.Content)`
  animation-duration: ${motionTimeM};
  animation-timing-function: ${motionEasingEnter};
  will-change: transform, opacity;
  animation-name: ${slideUpAndFadeIn};
`;

export const Styled = { Content };
