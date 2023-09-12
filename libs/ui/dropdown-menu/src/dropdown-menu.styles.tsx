import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

import {
  borderRadiusXS,
  motionEasingEnter,
  motionEasingStandard,
  motionTimeM,
  motionTimeS,
  motionTimeXS,
  scale070,
  scale320,
  slideLeftAndFadeIn,
  slideRightAndFadeIn,
  slideUpAndFadeIn,
  spaceL,
  spaceM,
  spaceXS,
} from '@smartcoorp/ui/tokens';

const contentSpacing = spaceXS;
const itemSpacing = `${spaceM} ${spaceM}`;
const labelSpacing = `${spaceXS} ${spaceL}`;

const Content = styled(DropdownMenu.Content)`
  /* min-width: ${scale320};

  width: 100%;
  padding: ${contentSpacing};

  border-radius: ${borderRadiusXS};
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  overflow: hidden;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.form.placeholderColor};
  box-shadow: ${({ theme }) => theme.shadow.shadowM}; */

  /** Animation styles */
  animation-duration: ${motionTimeM};
  animation-timing-function: ${motionEasingEnter};
  will-change: transform, opacity;
  animation-name: ${slideUpAndFadeIn};

  z-index: 9999;
`;

const SubContent = styled(DropdownMenu.SubContent)`
  min-width: ${scale320};
  width: 100%;

  border-radius: ${borderRadiusXS};
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  overflow: hidden;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.form.placeholderColor};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};

  /** Animation styles */
  animation-duration: ${motionTimeM};
  animation-timing-function: ${motionEasingEnter};
  will-change: transform, opacity;
  animation-name: ${slideUpAndFadeIn};

  &[data-side='left'] {
    animation-name: ${slideLeftAndFadeIn};
  }
  &[data-side='right'] {
    animation-name: ${slideRightAndFadeIn};
  }
`;
const Label = styled(DropdownMenu.Label)`
  font-size: ${scale070};
  color: ${({ theme }) => theme.form.neutralColor};
  margin: ${labelSpacing};
`;
const Separator = styled(DropdownMenu.Separator)`
  margin: ${spaceXS} 0;
  height: 1px;
  width: calc(100% + (${contentSpacing} * 2));
  margin-left: -${contentSpacing};
  background-color: ${({ theme }) => theme.form.placeholderColor};
`;
const Item = styled(DropdownMenu.Item)`
  padding: ${itemSpacing};

  display: flex;
  align-items: center;

  cursor: pointer;
  outline: none;
  border-radius: ${borderRadiusXS};

  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};
  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
  &[data-disabled] {
    opacity: 0.2;
    pointer-events: none;
  }
`;

const Group = styled(DropdownMenu.Group)``;

const SubTriggerIconContainer = styled.div`
  transition-property: transform, scale;
  transition-duration: ${motionTimeS};
  transition-timing-function: ${motionEasingStandard};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubTrigger = styled(DropdownMenu.SubTrigger)`
  width: 100%;
  padding: ${itemSpacing};

  display: flex;
  align-items: center;
  justify-content: space-between;

  outline: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
  &:hover ${SubTriggerIconContainer} {
    transform: translateX(4px);
    scale: 1.05;
  }
`;

export const Styled = {
  Content,
  Label,
  Separator,
  Item,
  Group,
  SubContent,
  SubTrigger,
  SubTriggerIconContainer,
};
