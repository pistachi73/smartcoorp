import { useContext } from 'react';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { useBlockSelectionUpdaterContext } from '../../contexts/block-selection-context';
import { Command, CommandActionDispatcher, CommandsContext } from '../../contexts/commands-context';
import { updateBlocks } from '../../helpers/fp-helpers';
import { setCaretPosition } from '../../helpers/set-caret-position';
import { waitForElement } from '../../helpers/wait-for-element';
import { useRefs } from '../use-refs';

export const useCommands = () => {
  const { commands, step } = useContext(CommandsContext);

  if (typeof commands === undefined || typeof step === undefined) {
    throw new Error('useCommands must be used within a CommandsContext');
  }

  const { setBlocks, updateBlockFields, removeBlocks, insertBlocks, swapBlocks } =
    useBlockUpdaterContext();
  const { prevCaretPosition, focusElement } = useRefs();
  const { setSelectedBlocks, setPivotSelectedBlock } = useBlockSelectionUpdaterContext();
  const actionDispatcher: CommandActionDispatcher = {
    editTextField: (payload) => {
      console.log(payload.fieldId);
      const { blockIndex, text, field, caretPosition, fieldId } = payload;
      const element = document.getElementById(fieldId);

      if (!element) return;
      updateBlockFields(blockIndex, { [field]: text });
      element.innerHTML = text;
      prevCaretPosition.current = caretPosition;
      setCaretPosition({
        element,
        position: caretPosition,
      });
    },
    editListField: (payload) => {
      const element = document.getElementById(payload.fieldId);

      if (!element) return;

      const itemsLength = payload.items.length;
      const childrenLength = element.children.length;
      updateBlockFields(payload.blockIndex, { items: payload.items });

      if (itemsLength > childrenLength) {
        for (let i = 0; i < childrenLength; i++) {
          element.children[i].innerHTML = payload.items[i] || '';
        }
        for (let i = childrenLength; i < itemsLength; i++) {
          const li = document.createElement('li');
          li.innerHTML = payload.items[i] || '';
          element.appendChild(li);
        }
      } else {
        for (let i = 0; i < itemsLength; i++) {
          element.children[i].innerHTML = payload.items[i] || '';
        }
        for (let i = itemsLength, c = 0; i < childrenLength; i++, c++) {
          element.children[i - c].remove();
        }
      }

      prevCaretPosition.current = payload.caretPosition;
      setCaretPosition({
        element: element,
        position: payload.caretPosition,
      });
    },
    splitTextBlock: async (payload) => {
      console.log(payload);
      const { field, blockIndex, fieldId, text, createdBlock } = payload;
      const element = document.getElementById(fieldId);

      if (!element) return;

      setBlocks(
        updateBlocks({
          $splice: [[blockIndex + 1, 0, createdBlock]],
          [blockIndex]: { data: { [field]: { $set: text } } },
        })
      );

      element.innerHTML = text;
      prevCaretPosition.current = 0;

      (await waitForElement(`${createdBlock.id}_0`))?.focus();
    },
    mergeTextBlock: (payload) => {
      console.log(payload);
      const { blockIndex, caretPosition, ref, fieldId, text } = payload;
      const element = document.getElementById(fieldId);

      if (!element) return;
      setBlocks(
        updateBlocks({
          $splice: [[blockIndex + 1, 1]],
          [blockIndex]: { data: { text: { $set: text } } },
        })
      );

      element.innerHTML = text;

      prevCaretPosition.current = payload.caretPosition;

      setCaretPosition({
        element,
        position: caretPosition,
      });
    },
    removeBlocks: (payload) => {
      const { removedBlocksIndexes } = payload;
      removeBlocks(removedBlocksIndexes);

      focusElement([removedBlocksIndexes[0], 0], 'end');
    },
    addBlocks: (payload) => {
      const { startingBlockIndex, blocks } = payload;
      setBlocks(
        updateBlocks({
          $splice: [[startingBlockIndex + 1, 0, ...blocks]],
        })
      );

      focusElement([startingBlockIndex + 1, 0], 'start');
    },
    replaceBlocks: async (payload) => {
      const { startingBlockIndex, addedBlocks, removedBlocksIndexes, focusBlockIndex } = payload;
      removeBlocks(removedBlocksIndexes);
      insertBlocks(addedBlocks, startingBlockIndex);

      if (addedBlocks.length) {
        await waitForElement(`${addedBlocks[0].id}_0`);
      }

      const focusIndex =
        focusBlockIndex || removedBlocksIndexes.length
          ? startingBlockIndex + addedBlocks.length - 1
          : startingBlockIndex + addedBlocks.length - 2;

      focusElement([focusIndex, 0], 'end');
    },
    swapBlocks: (payload) => {
      const { swapedBlocksIndexes, selectedBlocks } = payload;
      swapBlocks(swapedBlocksIndexes[0], swapedBlocksIndexes[1]);
      if (selectedBlocks) {
        setSelectedBlocks(selectedBlocks);
        setPivotSelectedBlock(selectedBlocks[selectedBlocks.length - 1]);
      }
    },
  };

  const addCommand = (command: Command) => {
    step.current += 1;
    commands.current = commands.current.slice(0, step.current);
    commands.current.push(command);
  };

  const undo = () => {
    if (step.current < 0) return;

    const {
      inverse: { type, payload },
    } = commands.current[step.current];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionDispatcher[type](payload as any);

    step.current -= 1;
  };

  const redo = () => {
    if (step.current + 1 >= commands.current.length) return;
    step.current += 1;
    const {
      action: { type, payload },
    } = commands.current[step.current];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionDispatcher[type](payload as any);
  };

  const removeBlocksAndAddCommand = (blockIndexes: number[]) => {
    const removedBlocks = removeBlocks(blockIndexes);

    // addCommand({
    //   type: 'removeBlocks',
    //   startingBlockIndex: blockIndexes[0],
    //   blocksRemovedIndexes: blockIndexes,
    //   blocks: removedBlocks,
    // });
  };

  return { commands, step, addCommand, undo, redo, removeBlocksAndAddCommand };
};
