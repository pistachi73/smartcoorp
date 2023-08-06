import { styled } from 'styled-components';

import {
  scale220,
  scale240,
  scale260,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const Col = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols}, 1fr)`};
  column-gap: ${spaceXXL};

  width: calc(100% + ${scale260});
  margin-left: calc(-${scale260} / 2);

  padding: ${spaceXL};
`;

export const Column = ({
  children,
  columns,
}: {
  columns: number;
  children: React.ReactNode;
}) => {
  return <Col $cols={columns}>{children}</Col>;
};
