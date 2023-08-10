import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusM,
  borderRadiusS,
  borderRadiusXS,
  motionEasingStandard,
  motionTimeS,
  scale030,
  space3XL,
  space4XL,
  spaceL,
  spaceM,
  spaceXXL,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const BlockContent = styled.div<{ $selected?: boolean }>`
  padding: ${scale030} 0;
  margin: ${spaceXXS} 0;

  border-radius: ${borderRadiusXS};

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
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusS};
  position: relative;
  max-width: 1200px;
  width: 100%;
  /* min-width: 768px; */
  min-height: 100vh;
  margin: 0 auto;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
  /* overflow: hidden; */
`;

export const BlockChainContainer = styled.div`
  padding: ${spaceXXL} ${space4XL};
`;
