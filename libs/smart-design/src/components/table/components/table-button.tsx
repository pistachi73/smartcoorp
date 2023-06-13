import styled from 'styled-components';

import {
  motionEasingStandard,
  motionTimeXS,
  scale140,
} from '@smartcoorp/smart-design/tokens';

export const TableButton = styled.button`
  height: ${scale140};

  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.form.placeholderColor};

  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};
`;
