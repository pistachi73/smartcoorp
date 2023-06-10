import styled from 'styled-components';

import { Body } from '../../body';

type SelectedRowsProps = {
  numberOfSelectedRows?: number;
  numberOfTotalRows: number;
};
const StyledBody = styled(Body)`
  color: ${({ theme }) => theme.form.neutralColor};
`;

export const SelectedRows = ({
  numberOfSelectedRows,
  numberOfTotalRows,
}: SelectedRowsProps) => {
  const selectedRows = numberOfSelectedRows ? numberOfSelectedRows : 0;

  return (
    <StyledBody noMargin size="small">
      {selectedRows} of {numberOfTotalRows} row(s) selected
    </StyledBody>
  );
};
