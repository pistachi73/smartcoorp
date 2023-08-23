import { motion } from 'framer-motion';
import { css, styled } from 'styled-components';

import { Button } from '@smartcoorp/ui/button';
import { Caption } from '@smartcoorp/ui/caption';
import {
  borderRadiusS,
  borderRadiusXXS,
  getFocusShadow,
  motionEasingStandard,
  motionTimeXS,
  scale060,
  scale130,
  scale140,
  scale380,
  spaceS,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  padding: ${spaceXS};

  height: ${scale140};

  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border-top-left-radius: ${borderRadiusS};
  border-top-right-radius: ${borderRadiusS};

  ${({ theme }) =>
    css`
      border-bottom: 1px solid ${theme.form.placeholderColor};
    `}
`;

export const IconsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${spaceXS};
`;

export const IconButton = styled(Button)<{ $formatted?: boolean }>`
  padding: ${spaceXS};

  height: ${scale130};
  min-width: ${scale130};

  font-size: ${scale060};
  font-weight: 500;

  transition-property: color, background-color;

  ${({ $formatted, theme }) =>
    $formatted &&
    css`
      color: ${theme.postEditor.toolbar.formattedIconColor};
    `}

  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
`;

export const TooltipCaption = styled(Caption)`
  padding: ${spaceXXS};
  margin-left: ${spaceXXS};
  border-radius: ${borderRadiusXXS};
  background-color: ${({ theme }) =>
    theme.postEditor.toolbar.tooltipCommandBackgroundColor};
`;

export const Separator = styled.div`
  height: calc(100% + ${spaceXS}*2);
  width: 1px;
  background-color: ${({ theme }) => theme.form.placeholderColor};
`;

export const LinkToolContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${spaceS};
`;

export const LinkInputContainer = styled.div`
  display: flex;
  align-items: center;

  width: ${scale380};
  font-size: ${scale060};

  border-radius: ${borderRadiusXXS};

  border: none;

  &:focus-within {
    outline: none;
    border: none;
    ${getFocusShadow({ shadowWidth: 2 })}
  }
`;
export const LinkInput = styled.input`
  width: 100%;
  font-size: ${scale060};

  padding: ${spaceXXS} ${spaceS};
  border-radius: ${borderRadiusXXS};

  border: none;

  &:focus {
    outline: none;
    border: none;
  }
`;

export const LinkInputSaveButton = styled.button`
  padding: ${spaceXXS} ${spaceS};
  position: relative;
  font-size: ${scale060};

  transition: background-color ${motionTimeXS} ${motionEasingStandard};

  &:focus,
  &:hover {
    outline: none;
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
  &:after {
    content: '';
    width: 1px;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    background-color: ${({ theme }) => theme.form.placeholderColor};
  }
`;