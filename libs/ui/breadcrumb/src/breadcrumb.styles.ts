'use client';
import styled, { css } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { spaceXS } from '@smartcoorp/ui/tokens';

export const BreadcrumbItem = styled.li`
  display: inline-block;
`;

export const BreadcrumbButton = styled(Button)<{ $isLastItem?: boolean }>`
  padding: 0;
  font-weight: 400;
  min-width: 0;

  ${({ $isLastItem }) =>
    $isLastItem &&
    css`
      cursor: default !important;
    `}
`;

export const OrderedList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Separator = styled(Body)`
  margin-inline: ${spaceXS} !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;
