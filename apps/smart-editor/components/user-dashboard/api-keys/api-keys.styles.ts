'use client';

import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusXS,
  gray100,
  gray300,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const ApiKeyTokenCell = styled(Body)`
  width: max-content;
  padding: ${spaceXXS} ${spaceXS};

  border: 1px solid ${gray300};
  background-color: ${gray100};
  border-radius: ${borderRadiusXS};
`;
