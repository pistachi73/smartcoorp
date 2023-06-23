import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { spaceXS } from '@smartcoorp/ui/tokens';

const BreadcrumbItem = styled.li`
  display: inline-block;
`;

const BreadcrumbButton = styled(Button)`
  padding: 0;
  font-weight: 400;
  min-width: 0;
`;

const OrderedList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Separator = styled(Body)`
  margin-inline: ${spaceXS} !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Styled = {
  BreadcrumbItem,
  BreadcrumbButton,
  OrderedList,
  Separator,
};
