import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusXS,
  space3XL,
  spaceL,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

import { Styled as S } from '../table.styles';
type SelectedRowsWidgetProps = {
  table: Table<any>;
  /** @callback */
  onRowsDelete?: (rows: any[]) => void;
  editUrl?: string;
};

const Container = styled(motion.div)`
  position: fixed;
  bottom: ${space3XL};
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: ${spaceM};

  border: 1px solid ${({ theme }) => theme.form.placeholderColor};
  padding: ${spaceM} ${spaceL};
  border-radius: ${borderRadiusXS};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};
  background-color: ${({ theme }) => theme.backgroundScreen};
  clear: both;
`;

const Divider = styled.div`
  width: 1px;
  height: 36px;
  margin-inline: ${spaceS};
  background-color: ${({ theme }) => theme.form.placeholderColor};
`;

export const SelectedRowsWidget = <T extends { id: number }>({
  table,
  onRowsDelete,
  editUrl,
}: SelectedRowsWidgetProps) => {
  const numberOfSelectedRows = table.getFilteredSelectedRowModel().rows.length;
  const areSomeRowsSelected = numberOfSelectedRows > 0;
  const rowsData = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original);

  return (
    <AnimatePresence>
      {areSomeRowsSelected && (
        <Container
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 150,
            damping: 25,
          }}
        >
          <Body fontWeight="bold" size="small" noMargin>
            {numberOfSelectedRows} selected
          </Body>
          <S.StyledButton
            variant="secondary"
            size="small"
            onClick={() => table.toggleAllPageRowsSelected(true)}
          >
            Select all
          </S.StyledButton>
          <S.StyledButton
            variant="secondary"
            size="small"
            onClick={() => table.toggleAllPageRowsSelected(false)}
          >
            Unselect all
          </S.StyledButton>

          <Divider />
          {onRowsDelete && (
            <S.StyledButton
              variant="secondary"
              color="error"
              size="small"
              onClick={() => {
                onRowsDelete(rowsData);
                table.toggleAllPageRowsSelected(false);
              }}
              icon={BiTrashAlt}
            />
          )}
          {editUrl && numberOfSelectedRows === 1 ? (
            <S.StyledButton
              variant="secondary"
              size="small"
              to={`${editUrl}/${rowsData[0]?.id ?? ''}`}
              icon={BiEdit}
            />
          ) : (
            <S.StyledButton
              variant="secondary"
              size="small"
              disabled={true}
              icon={BiEdit}
            />
          )}
        </Container>
      )}
    </AnimatePresence>
  );
};
