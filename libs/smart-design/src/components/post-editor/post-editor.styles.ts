import styled, { css } from 'styled-components';

import { borderRadiusXS } from '../../tokens/borderRadius';
import { motionEasingStandard, motionTimeS } from '../../tokens/motion';
import { scale180 } from '../../tokens/scale';
import { spaceL, spaceM, spaceS } from '../../tokens/spacing';
import { Body } from '../body';

export const BlockContent = styled.div<{ $selected?: boolean }>`
  margin: 0 ${scale180};
  padding: ${spaceS} 0;

  transition-timing-function: ${motionEasingStandard};
  transition-duration: ${motionTimeS};
  transition-property: background-color;

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: rgba(179, 212, 252, 0.25) !important;
    `}
`;

export const BlockContainer = styled.div``;

export const InputBox = styled(Body).attrs(() => ({ noMargin: true }))<{
  $loading?: boolean;
  $error?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${spaceM} ${spaceL};
  background-color: ${({ theme }) => theme.common.backgroundColor};
  border-radius: ${borderRadiusXS};
  margin-bottom: ${spaceM};

  color: ${({ $loading, $error, theme }) =>
    $error
      ? theme.common.errorColor
      : $loading
      ? theme.common.disabledSurfaceColor
      : theme.color.neutral};
  cursor: ${({ $loading }) => $loading && 'not-allowed'};
  pointer-events: ${({ $loading }) => $loading && 'none'};

  :focus {
    outline: none;
  }

  :empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }
  :not(:empty) {
    background-color: ${({ $loading, $error, theme }) =>
      $error
        ? theme.postEditor.linkTool.errorBackgroundColor
        : !$loading && 'transparent'};
    outline: 1px solid;
    outline-color: ${({ theme, $error }) =>
      $error ? theme.common.errorColor : theme.common.overBackgroundNeutral};
  }
`;

export const PostEditorContainer = styled.div`
  position: relative;
  max-width: 768px;
  margin: ${spaceL};
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
  /* overflow: hidden; */
`;
