import styled, { css } from 'styled-components';

import { Body as BodyComponent } from '@smartcoorp/ui/body';
import {
  borderRadiusS,
  gray200,
  gray300,
  gray400,
  primary300,
  scale005,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
} from '@smartcoorp/ui/tokens';

type TableRowProps = {
  isHeaderRow?: boolean;
};

export const Table = styled.table`
  min-width: 100%;
`;
export const TableRow = styled.tr<TableRowProps>`
  ${({ isHeaderRow }) =>
    isHeaderRow
      ? css`
          border-bottom: 1px solid ${gray400};
        `
      : css`
          border-bottom: 1px solid ${gray200};
          padding: ${spaceM} 0;
          align-items: center;
        `}
  height: 100%;
  text-align: left;
  display: flex;
`;

export const BodyHeaders = styled(BodyComponent)`
  color: ${gray400};
`;

export const NameColumn = styled.th`
  flex: 1 0 25%;
`;

export const NameCell = styled.div`
  display: flex;
  align-items: center;
`;

export const NameButton = styled.button`
  background-color: white;
  padding: ${spaceXS};
  border-radius: ${borderRadiusS};
  margin-left: ${spaceM};
  outline: none;
  border: 0.5px solid ${primary300};
  cursor: pointer;
`;

export const ValueColumn = styled.th`
  flex: 0 0 50%;
`;

export const ValueCell = styled.div`
  padding: ${spaceS} 0;
  border-radius: ${borderRadiusS};
  border: ${scale005} solid ${gray300};
  margin-right: ${spaceXL};
`;

export const ValueBody = styled(BodyComponent)`
  margin-left: ${spaceM};
  margin-bottom: 0;
`;

export const PreviewColumn = styled.th`
  flex: 0 0 25%;
`;
