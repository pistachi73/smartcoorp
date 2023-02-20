import { useEffect, useState } from 'react';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-context';
import { ToRemoveBlock } from '../../../contexts/blocks-context/blocks-reducer';
import { useRefsContext } from '../../../contexts/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlUpdaterContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import { getBlockContainerAttributes } from '../../../helpers/get-block-container-attributes';

type UseSharedToolsProps = {
  blockIndex: number;
  blockId: string;
};

export const useSharedTools = ({
  blockIndex,
  blockId,
}: UseSharedToolsProps) => {
  const { moveBlocks, removeBlocks, duplicateBlock, buildFocusFieldAction } =
    useBlocksDBUpdaterContext();
  const { getNextFocusableField, focusField } = useRefsContext();
  const { blockRefs } = useRefsContext();
  const setToolBlockIndex = useToolBlockIndexUpdaterContext();
  const { setIsModifyBlockMenuOpened } = useToolControlUpdaterContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();

  const [{ chainBlockIndex, chainId }, setBlockProps] = useState(
    getBlockContainerAttributes(blockRefs.current[blockIndex])
  );

  const [{ isMoveUpDisabled, isMoveDownDisabled }, setDisabled] = useState({
    isMoveUpDisabled: false,
    isMoveDownDisabled: false,
  });

  useEffect(() => {
    const blockProps = getBlockContainerAttributes(
      blockRefs.current[blockIndex]
    );

    setBlockProps(blockProps);
    setDisabled({
      isMoveUpDisabled: blockProps.chainBlockIndex === 0,
      isMoveDownDisabled:
        blockProps.chainBlockIndex === blockProps.chainLength - 1,
    });
  }, [blockIndex, blockRefs]);

  const getBlockId = (index: number): string => {
    const { blockId } = getBlockContainerAttributes(blockRefs.current[index]);
    return blockId;
  };

  const getMoveBlockIndex = (direction: 'up' | 'down'): number => {
    const directionFactor = direction === 'up' ? -1 : 1;

    let index = blockIndex + directionFactor;

    let moveBlockId = getBlockId(index);

    while (moveBlockId !== blockId) {
      index = index + directionFactor;
      moveBlockId = getBlockId(index);
    }

    return index;
  };

  const onMoveUp = async () => {
    if (isMoveUpDisabled) return;

    const undo = buildFocusFieldAction({
      fieldId: `${blockId}_0`,
      position: 'end',
    });
    // Wait until blockRefs are updated to get the correct index
    await moveBlocks({
      chainBlockIndexes: [chainBlockIndex],
      chainId,
      direction: 'up',
      undo: undo,
      redo: undo,
    });

    const prevIndex = getMoveBlockIndex('up');

    //Wait until menu is closed to open it again and then set the correct block index
    await setIsModifyBlockMenuOpened(false);
    await setIsModifyBlockMenuOpened(true);
    setToolBlockIndex(prevIndex);
    setSelectedBlocks([prevIndex]);
  };

  const onMoveDown = async () => {
    if (isMoveDownDisabled) return;

    const undo = buildFocusFieldAction({
      fieldId: `${blockId}_0`,
      position: 'end',
    });
    // Wait until blockRefs are updated to get the correct index
    await moveBlocks({
      chainBlockIndexes: [chainBlockIndex],
      chainId,
      direction: 'down',
      undo: undo,
      redo: undo,
    });

    const nextIndex = getMoveBlockIndex('down');

    //Wait until menu is closed to open it again and then set the correct block index
    await setIsModifyBlockMenuOpened(false);
    await setIsModifyBlockMenuOpened(true);
    setToolBlockIndex(nextIndex);
    setSelectedBlocks([nextIndex]);
  };

  const onDelete = () => {
    const toRemoveBlocks: ToRemoveBlock[] = [[blockId, chainId]];
    const nextFocusableField = getNextFocusableField(blockIndex, 0, -1);
    const { blockId: nextFocusableBlockId } = getBlockContainerAttributes(
      blockRefs.current[nextFocusableField[0]]
    );

    removeBlocks({
      toRemoveBlocks,
      undo: buildFocusFieldAction({
        fieldId: `${blockId}_0`,
        position: 'end',
      }),
      redo: buildFocusFieldAction({
        fieldId: `${nextFocusableBlockId}_0`,
        position: 'end',
      }),
    });

    focusField(nextFocusableField, 'end');
    setSelectedBlocks([]);
    setIsModifyBlockMenuOpened(false);
    setToolBlockIndex(-1);
  };

  const onDuplicate = () => {
    const undo = buildFocusFieldAction({
      fieldId: `${blockId}_0`,
      position: 'end',
    });

    duplicateBlock({
      blockId,
      chainId,
      chainBlockIndex,
      undo: undo,
      redo: undo,
    });

    setSelectedBlocks([]);
    setIsModifyBlockMenuOpened(false);
  };

  const handleSharedToolsKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
      onMoveUp();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown') {
      onMoveDown();
    } else if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'Delete' || e.key === 'Backspace')
    ) {
      e.preventDefault();
      onDelete();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      onDuplicate();
    }
  };

  return {
    onMoveUp,
    onMoveDown,
    onDelete,
    onDuplicate,
    handleSharedToolsKeyDown,
    isMoveUpDisabled,
    isMoveDownDisabled,
  };
};
