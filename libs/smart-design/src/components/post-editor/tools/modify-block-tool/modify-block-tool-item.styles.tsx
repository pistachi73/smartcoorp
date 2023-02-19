import styled from 'styled-components';

import {
  borderRadiusXS,
  gray400,
  primary,
  primary100,
  primary200,
  primary400,
  primary600,
  scale050,
  scale060,
  scale070,
  scale090,
  scale110,
  spaceM,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/smart-design/tokens';

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${spaceXS} ${spaceM};
`;

export const IconContainer = styled.div`
  width: ${scale110};
  height: ${scale110};
  margin-right: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.neutral};
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

export const CommandContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  gap: ${spaceXXS};
  cursor: pointer;
  border-radius: ${borderRadiusXS};
`;

export const KBD = styled.kbd`
  font-family: 'Inter', 'Montserrat', 'Trebuchet MS', Arial, 'Helvetica Neue',
    sans-serif;

  height: ${scale090};
  width: ${scale090};
  font-size: ${scale050};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadiusXS};
  color: ${primary400};
  background-color: ${primary100};
`;
