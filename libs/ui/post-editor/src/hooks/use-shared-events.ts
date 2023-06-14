import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context/block-selection-context';
import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-context';
import { useRefsContext } from '../contexts/refs-context';
import { getBlockContainerAttributes } from '../helpers/get-block-container-attributes';

import { getToRemoveBlocksFromSelection } from './use-block-selection/use-block-selection-helpers';

type UseSharedEventsResult = {
  handleSharedKeyDown: (e: React.KeyboardEvent) => void;
  handleSharedClickDown: (e: React.MouseEvent) => void;
};

export const useSharedEvents = (): UseSharedEventsResult => {
  const { removeBlocks, undo, redo, buildFocusFieldAction } =
    useBlocksDBUpdaterContext();
  const blocksDB = useBlocksDBConsumerContext();
  const { blockRefs, getNextFocusableField, focusField } = useRefsContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { selectedBlocks } = useBlockSelectionConsumerContext();

  const handleBackspaceDelete = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) return;

    e.preventDefault();

    const firstSelectedBlockIndex = selectedBlocks[0];
    const { blockId: firstSelectedBlockId } = getBlockContainerAttributes(
      blockRefs.current[firstSelectedBlockIndex]
    );

    const toRemoveBlocks = getToRemoveBlocksFromSelection(
      selectedBlocks,
      blockRefs.current
    );

    const prevBlock = getNextFocusableField(firstSelectedBlockIndex, 0, -1);
    const { blockId: prevBlockId } = getBlockContainerAttributes(
      blockRefs.current[prevBlock[0]]
    );

    //TODO: await for removeBlocks to finish???
    removeBlocks({
      toRemoveBlocks,
      undo: buildFocusFieldAction({
        fieldId: `${firstSelectedBlockId}_0`,
        position: 'end',
      }),
      redo: buildFocusFieldAction({
        fieldId: `${prevBlockId}_${prevBlock[1]}`,
        position: 'end',
      }),
    });

    focusField(prevBlock, 'end');
    setSelectedBlocks([]);
  };

  const handleSharedKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleBackspaceDelete(e);
    }

    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canUndo) undo();
    }
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canRedo) redo();
    }
  };

  const handleSharedClickDown = (e: React.MouseEvent) => {
    if (!selectedBlocks.length) return;
    setSelectedBlocks([]);
  };
  return { handleSharedKeyDown, handleSharedClickDown };
};
