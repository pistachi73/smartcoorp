import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { borderRadiusXS, spaceM } from '@smartcoorp/ui/tokens';

export const TextBoxField = styled(Body).attrs(() => ({ noMargin: true }))<{
  $loading?: boolean;
  $error?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${spaceM};
  background-color: ${({ theme }) => theme.common.backgroundColor};
  border-radius: ${borderRadiusXS};
  margin-bottom: ${spaceM};

  overflow-wrap: anywhere;
  outline: none;

  color: ${({ $loading, $error, theme }) =>
    $error
      ? theme.common.errorColor
      : $loading
      ? theme.common.disabledSurfaceColor
      : theme.color.neutral};
  cursor: ${({ $loading }) => $loading && 'not-allowed'};
  pointer-events: ${({ $loading }) => $loading && 'none'};

  background-color: ${({ $loading, $error, theme }) =>
    $error
      ? theme.postEditor.linkTool.errorBackgroundColor
      : !$loading && 'transparent'};
  outline: 1px solid;
  outline-color: ${({ theme, $error }) =>
    $error ? theme.common.errorColor : theme.common.overBackgroundNeutral};

  &:empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }
`;
