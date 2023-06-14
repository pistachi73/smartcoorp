import * as ScrollArea from '@radix-ui/react-scroll-area';
import styled from 'styled-components';

import {
  motionEasingLeave,
  motionTimeS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const ScrollAreaRoot = styled(ScrollArea.Root)`
  height: 100%;
  --scrollbar-size: 10px;
  border-radius: 4px;
`;

export const ScrollAreaViewport = styled(ScrollArea.Viewport)<{
  $maxHeight: number;
}>`
  width: 100%;
  height: 100%;
  max-height: ${(props) => props.$maxHeight}px;
  border-radius: inherit;
`;

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: ${spaceXXS};
  background: ${({ theme }) => theme.scrollArea.scrollbarBackground};
  transition-property: background;
  transition-duration: ${motionTimeS};
  transition-timing-function: ${motionEasingLeave};

  border-left: 1px solid;
  border-color: ${({ theme }) => theme.scrollArea.scrollbarBackgroundHover};

  &:hover {
    background: ${({ theme }) => theme.scrollArea.scrollbarBackgroundHover};
  }
  &[data-orientation='vertical'] {
    width: var(--scrollbar-size);
  }
  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
`;

export const ScrollAreaThumb = styled(ScrollArea.Thumb)`
  flex: 1;

  background: ${({ theme }) => theme.scrollArea.thumbColor};

  border-radius: var(--scrollbar-size);
  position: relative;
  /* increase target size for touch devices https:www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

export const ScrollAreaCorner = styled(ScrollArea.Corner)`
  background: ${({ theme }) => theme.scrollArea.thumbColor};
`;
