import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusS,
  borderRadiusXS,
  borderRadiusXXS,
  gray100,
  gray700_RGBA,
  gray900_RGBA,
  motionEasingStandard,
  motionTimeS,
  scale030,
  scale050,
  space4XL,
  spaceL,
  spaceM,
  spaceS,
  spaceXS,
  spaceXXL,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

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
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusS};
  position: relative;
  max-width: 872px;
  width: 100%;
  /* min-width: 768px; */
  min-height: 100vh;
  margin: 0 auto;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
  /* overflow: hidden; */

  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  z-index: 1;
`;

export const BlockChainContainer = styled.div`
  padding: ${spaceXXL} ${space4XL};
`;

export const ViewIdTag = styled.span<{ $position: 'left' | 'right' }>`
  font-size: 12px;
  color: ${gray100};
  padding: ${spaceXS};
  margin-bottom: ${spaceS};
  background-color: rgba(${gray900_RGBA}, 0.75);
  border-radius: ${borderRadiusXXS};

  ${({ $position }) =>
    $position === 'left'
      ? css``
      : css`
          position: absolute;
          right: 0;
          top: 0px;
        `};
`;

export const StyledBlockChainContainer = styled.div<{
  $backgroundColor?: string;
}>`
  transition-timing-function: ${motionEasingStandard};
  transition-duration: ${motionTimeS};
  transition-property: background-color;
  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background-color: ${$backgroundColor};
    `};
`;

export const BlockContent = styled.div<{
  $selected?: boolean;
  $viewBlocks?: boolean;
}>`
  padding: ${scale030} 0;
  margin: ${spaceXXS} 0;

  position: relative;
  border-radius: ${borderRadiusXS};

  transition-timing-function: ${motionEasingStandard};
  transition-duration: ${motionTimeS};
  transition-property: background-color, border-color;

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: rgba(179, 212, 252, 0.25) !important;
    `};

  ${({ $viewBlocks }) =>
    $viewBlocks
      ? css`
          border: 1px solid rgba(${gray900_RGBA}, 0.6);
        `
      : css`
          border: 1px solid transparent;
        `};
`;
