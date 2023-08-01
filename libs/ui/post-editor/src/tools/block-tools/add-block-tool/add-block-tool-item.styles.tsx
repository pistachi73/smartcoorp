import styled from 'styled-components';

import {
  borderRadiusXS,
  gray400,
  scale060,
  scale070,
  spaceM,
  spaceXS,
} from '@smartcoorp/ui/tokens';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spaceXS} ${spaceM};
`;
export const IconContainer = styled.div`
  width: 45px;
  height: 45px;
  margin-right: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${spaceXS};

  border-radius: ${borderRadiusXS};
  border: 1px solid ${({ theme }) => theme.color.neutral};
  background-color: white;
`;

export const Label = styled.span`
  font-size: ${scale070};
`;

export const Snippet = styled.span`
  line-height: 1.25;
  display: block;
  font-size: ${scale060};
  color: ${gray400};
`;
