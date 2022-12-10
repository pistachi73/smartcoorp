import { memo, useState } from 'react';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { spaceS } from '../../../../tokens/spacing';
import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { useBlockEdit } from '../../hooks/use-block-edit';

import * as S from './modify-block.styles';

const DeleteMenuItem = styled(S.MenuItem)<{
  $deleteEnabled?: boolean;
}>`
  ${({ $deleteEnabled, theme }) => css`
    color: ${$deleteEnabled && theme.color.invertedNeutral} !important;
    background-color: ${$deleteEnabled && theme.common.errorColor} !important;
  `}
`;

const ToolContainerWithGap = styled(S.ToolContainer)<{ $withGap: boolean }>`
  margin-top: ${({ $withGap }) => $withGap && spaceS};
`;

const MoveMenuItem = styled(S.MenuItem)<{ $disabled: boolean }>`
  color: ${({ $disabled, theme }) =>
    $disabled && theme.common.disabledSurfaceColor} !important;
`;

type CommonToolsProps = {
  menuRefs: any;
  blockIndex: number;
  startingIndex: number;
};

export const CommonTools = memo<CommonToolsProps>(
  ({ menuRefs, blockIndex, startingIndex }) => {
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const { swapBlocks } = useUpdateBlocks();
    const { refs } = useRefs();
    const { removeBlockAndFocusPrevious } = useBlockEdit(blockIndex);

    const handleDelete = async () => {
      if (!deleteEnabled) {
        setDeleteEnabled(true);
      } else {
        await removeBlockAndFocusPrevious();
        setDeleteEnabled(false);
      }
    };

    return (
      <ToolContainerWithGap $withGap={startingIndex !== 0}>
        <MoveMenuItem
          ref={(el: HTMLElement) => (menuRefs.current[startingIndex] = el)}
          $disabled={blockIndex === 0}
          onClick={() => blockIndex !== 0 && swapBlocks(blockIndex, -1)}
        >
          <BiUpArrowAlt size={24} />
        </MoveMenuItem>

        <DeleteMenuItem
          $deleteEnabled={deleteEnabled}
          ref={(el: HTMLElement) => (menuRefs.current[startingIndex + 1] = el)}
          onClick={handleDelete}
        >
          <MdDelete size={20} />
        </DeleteMenuItem>
        <MoveMenuItem
          ref={(el: HTMLElement) => (menuRefs.current[startingIndex + 2] = el)}
          $disabled={blockIndex === refs.current.length - 1}
          onClick={() => {
            blockIndex !== refs.current.length - 1 && swapBlocks(blockIndex, 1);
          }}
        >
          <BiDownArrowAlt size={24} />
        </MoveMenuItem>
      </ToolContainerWithGap>
    );
  }
);
