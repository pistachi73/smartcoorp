import { useEffect, useState } from 'react';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-db-context';
import {
  DUPLICATE_BLOCK,
  MOVE_BLOCKS,
  REMOVE_BLOCKS,
  ToRemoveBlock,
} from '../../../contexts/blocks-db-context/blocks-db-reducer';
import { FOCUS_FIELD } from '../../../contexts/blocks-db-context/undo-redo-reducer/actions';
import { useRefsContext } from '../../../contexts/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlContext,
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
  const dispatchBlocksDB = useBlocksDBUpdaterContext();
  const { setPrevCaretPosition, getNextFocusableField, focusField } =
    useRefsContext();
  const { blockRefs } = useRefsContext();
  const toolControl = useToolControlContext();
  const setToolBlockIndex = useToolBlockIndexUpdaterContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();

  const [
    { chainBlockIndex, chainId, chainLevel, parentChainId },
    setBlockProps,
  ] = useState(getBlockContainerAttributes(blockRefs.current[blockIndex]));

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

    const undoAction = {
      type: FOCUS_FIELD,
      payload: {
        fieldId: `${blockId}_0`,
        position: 'end',
        setPrevCaretPosition,
      },
    } as const;

    // Wait until blockRefs are updated to get the correct index
    await dispatchBlocksDB({
      type: 'MOVE_BLOCKS',
      payload: {
        chainBlockIndexes: [chainBlockIndex],
        chainId,
        direction: 'up',
        undoAction,
        redoAction: undoAction,
      },
    });

    const prevIndex = getMoveBlockIndex('up');

    //Wait until menu is closed to open it again and then set the correct block index
    await toolControl.setIsModifyBlockMenuOpened(false);
    await toolControl.setIsModifyBlockMenuOpened(true);
    setToolBlockIndex(prevIndex);
    setSelectedBlocks([prevIndex]);
  };

  const onMoveDown = async () => {
    if (isMoveDownDisabled) return;

    const undoAction = {
      type: FOCUS_FIELD,
      payload: {
        fieldId: `${blockId}_0`,
        position: 'end',
        setPrevCaretPosition,
      },
    } as const;

    // Wait until blockRefs are updated to get the correct index
    await dispatchBlocksDB({
      type: MOVE_BLOCKS,
      payload: {
        chainBlockIndexes: [chainBlockIndex],
        chainId,
        direction: 'down',
        undoAction,
        redoAction: undoAction,
      },
    });
    const nextIndex = getMoveBlockIndex('down');

    //Wait until menu is closed to open it again and then set the correct block index
    await toolControl.setIsModifyBlockMenuOpened(false);
    await toolControl.setIsModifyBlockMenuOpened(true);
    setToolBlockIndex(nextIndex);
    setSelectedBlocks([nextIndex]);
  };

  const onDelete = () => {
    const toRemoveBlocks: ToRemoveBlock[] = [[blockId, chainId]];
    const nextFocusableField = getNextFocusableField(blockIndex, 0, -1);
    const { blockId: nextFocusableBlockId } = getBlockContainerAttributes(
      blockRefs.current[nextFocusableField[0]]
    );

    dispatchBlocksDB({
      type: REMOVE_BLOCKS,
      payload: {
        toRemoveBlocks,
        undoAction: {
          type: FOCUS_FIELD,
          payload: {
            fieldId: `${blockId}_0`,
            position: 'end',
            setPrevCaretPosition,
          },
        },
        redoAction: {
          type: FOCUS_FIELD,
          payload: {
            fieldId: `${nextFocusableBlockId}_0`,
            position: 'end',
            setPrevCaretPosition,
          },
        },
      },
    });

    console.log(nextFocusableField);

    focusField(nextFocusableField, 'end');
    setSelectedBlocks([]);
    toolControl.setIsModifyBlockMenuOpened(false);
    setToolBlockIndex(-1);
  };

  const onDuplicate = () => {
    console.log('onDuplicate');
    const undoAction = {
      type: FOCUS_FIELD,
      payload: {
        fieldId: `${blockId}_0`,
        position: 'end',
        setPrevCaretPosition,
      },
    } as const;

    dispatchBlocksDB({
      type: DUPLICATE_BLOCK,
      payload: {
        blockId,
        chainId,
        chainBlockIndex,
        undoAction,
        redoAction: undoAction,
      },
    });
    setSelectedBlocks([]);
    toolControl.setIsModifyBlockMenuOpened(false);
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
