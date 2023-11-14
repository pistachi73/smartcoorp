import * as TabsPrimitive from '@radix-ui/react-tabs';
import styled from 'styled-components';

import { ResizablePanel } from '@smartcoorp/ui/resizable-panel';
import {
  motionEasingStandard,
  motionTimeXS,
  primary,
  primary_RGBA,
  scale070,
  scale150,
  spaceL,
  spaceS,
  spaceXL,
} from '@smartcoorp/ui/tokens';

const Tabs = styled(TabsPrimitive.Root)`
  overflow: visible;

  width: 100%;
`;

const TabTrigger = styled(TabsPrimitive.Trigger)`
  font-size: ${scale070};
  height: ${scale150};
  padding-inline: ${spaceL};
  position: relative;

  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;

  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  display: flex;
  align-items: center;
  gap: ${spaceS};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: 0;
  }

  &[data-state='active'] {
    color: ${primary};

    &::before {
      background-color: ${primary};
    }
  }
  &[data-state='inactive'] {
    color: ${({ theme }) => theme.form.placeholderColor};
    &::before {
      background-color: ${({ theme }) => theme.form.placeholderColor};
    }
  }

  &[data-state='disabled'] {
    opacity: 0.35;
    pointer-events: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(${primary_RGBA}, 0.25);
    border-top: 1px solid ${primary};
    border-left: 1px solid ${primary};
    border-right: 1px solid ${primary};
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
`;

const TabTriggerIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabsContent = styled(TabsPrimitive.Content)``;
const TabsList = styled(TabsPrimitive.List)`
  position: relative;
  margin-bottom: ${spaceXL};
  overflow: visible;

  display: flex;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: 0;
    background-color: ${({ theme }) => theme.form.placeholderColor};
  }
`;

const VisibleResizablePanel = styled(ResizablePanel)`
  /* overflow: visible; */
`;

export const Styled = {
  Tabs,
  TabTrigger,
  TabsContent,
  TabsList,
  TabTriggerIconContainer,
  VisibleResizablePanel,
};
