/* eslint-disable no-prototype-builtins */
import produce, { applyPatches, enablePatches } from 'immer';

import {
  buildParagraphBlock,
  getBlockContainerAttributes,
  getElementTextContent,
  getHTMLStringTextContent,
  nanoid,
  waitForElement,
} from '../../../helpers';
import { setCaretPosition } from '../../../helpers/set-caret-position';
import { EveryBlockFields } from '../../../post-editor.types';
import { BlockDataDB } from '../blocks-context.types';
import type { UndoRedoChanges } from '../undo-redo-reducer';
import { UndoRedoTypes, undoRedoDispatcher } from '../undo-redo-reducer';

import { addBlocks, removeBlocks } from './blocks-reducer.helpers';
import {
  BlocksDBAction,
  BlocksDBReducerState,
  ReducerTypes,
  isUndoableAction,
} from './blocks-reducer.types';

enablePatches();

let currentVersion = -1;
const noOfVersionsSupported = 15;
let changes: UndoRedoChanges = {};

export const blocksDBReducer = (
  state: BlocksDBReducerState,
  action: BlocksDBAction
) => {
  return produce(
    state,
    (draft) => {
      switch (action.type) {
        case ReducerTypes.MODIFY_FIELD: {
          const { field, blockId, value } = action.payload;

          (draft.blocks[blockId].data as any)[field] = value;

          const currentVal = (state.blocks[blockId].data as EveryBlockFields)[
            field
          ];

          if (!action.undo || !action.redo) break;

          if (
            (action.undo.type === UndoRedoTypes.MODIFY_FIELD_INNERHTML &&
              action.redo.type === UndoRedoTypes.MODIFY_FIELD_INNERHTML) ||
            (action.undo.type === UndoRedoTypes.MODIFY_LIST_INNERHTML &&
              action.redo.type === UndoRedoTypes.MODIFY_LIST_INNERHTML)
          ) {
            action.undo.payload.value = (currentVal as any) ?? null;
            action.redo.payload.value = value;
          }

          break;
        }

        case ReducerTypes.REMOVE_BLOCKS: {
          removeBlocks(draft, action.payload.toRemoveBlocks);
          break;
        }

        case ReducerTypes.ADD_BLOCKS: {
          addBlocks(draft, action.payload.toAddBlocks);
          break;
        }

        case ReducerTypes.REPLACE_BLOCKS: {
          addBlocks(draft, action.payload.toAddBlocks);
          removeBlocks(draft, action.payload.toRemoveBlocks, true);
          break;
        }

        case ReducerTypes.SPLIT_TEXT_FIELD: {
          const {
            field,
            blockId,
            chainId,
            innerHTML,
            splitedBlockRef,
            chainBlockIndex,
          } = action.payload;

          const splitInnerHTML = innerHTML
            .split(/<div>(.*?)<\/div>/)
            .filter((t) => t !== '')
            .map((t) => t.replace(/<br>/g, ''));

          const textAfterCaret = (
            splitInnerHTML[1]?.replace(/<br>/g, '') || ''
          ).trim();
          const textBeforeCaret = (
            splitInnerHTML[0]?.replace(/<br>/g, '') || ''
          ).trim();

          const textBeforeCaretContent =
            getHTMLStringTextContent(textBeforeCaret);

          const newBlock = buildParagraphBlock(chainId, textAfterCaret);

          addBlocks(draft, [[newBlock, chainId, chainBlockIndex + 1]]);

          (draft.blocks[blockId].data as EveryBlockFields)[field] =
            textBeforeCaret || ('' as any);

          splitedBlockRef.innerHTML = textBeforeCaretContent.length
            ? textBeforeCaret
            : '';

          focusElementById(`${newBlock.id}_0`);

          // Update undo and redo actions
          if (!action.undo || !action.redo) break;

          action.undo.payload.value = (
            state.blocks[blockId].data as EveryBlockFields
          )[field] as string;
          action.redo.payload.focusFieldId = `${newBlock.id}_0`;
          action.redo.payload.value = textBeforeCaret;

          break;
        }

        case ReducerTypes.MERGE_TEXT_FIELDS: {
          const {
            mergedBlockRef,
            mergedField,
            mergedFieldRef,
            removedChainBlockIndex,
            removedInnerHTML,
            removedChainId,
          } = action.payload;
          const { blockId: mergedBlockId } =
            getBlockContainerAttributes(mergedBlockRef);

          const mergedFieldInnerHTML = mergedFieldRef.innerHTML;
          const newHTML = `${mergedFieldInnerHTML}${removedInnerHTML}`.trim();

          (draft.blocks[mergedBlockId].data as EveryBlockFields)[mergedField] =
            newHTML as any;

          mergedFieldRef.innerHTML = newHTML;

          removeBlocks(draft, [
            [
              draft.chains[removedChainId][removedChainBlockIndex],
              removedChainId,
            ],
          ]);

          if (!action.undo || !action.redo) break;

          // Update undo and redo actions
          action.redo.payload.value = newHTML;
          action.undo.payload.value = mergedFieldInnerHTML;

          break;
        }

        case ReducerTypes.REMOVE_LAST_LIST_ITEM: {
          const { items, blockId, chainId, field, fieldId, chainBlockIndex } =
            action.payload;

          const fieldRef = document.getElementById(fieldId) as HTMLElement;

          items.pop();

          (draft.blocks[blockId].data as EveryBlockFields)[field] =
            items as any;

          if (items.length === 0) {
            removeBlocks(draft, [[blockId, chainId]]);
          } else {
            // Update the DOM
            for (let i = 0; i < items.length; i++) {
              fieldRef.children[i].innerHTML = items[i] || '';
            }
            for (
              let i = items.length, c = 0;
              i < fieldRef.children.length;
              i++, c++
            ) {
              fieldRef.children[i - c].remove();
            }
          }

          const newBlock = buildParagraphBlock(chainId);

          addBlocks(draft, [[newBlock, chainId, chainBlockIndex + 1]]);

          focusElementById(`${newBlock.id}_0`);

          if (!action.undo || !action.redo) break;

          // Update undo and redo actions
          action.undo.payload.value = (
            state.blocks[blockId].data as EveryBlockFields
          )[field] as string[];
          action.redo.payload.focusFieldId = `${newBlock.id}_0`;
          action.redo.payload.value = items;

          break;
        }

        case ReducerTypes.MODIFY_LINK_DATA: {
          const { blockId, ...linkData } = action.payload;

          draft.blocks[blockId].data = {
            ...draft.blocks[blockId].data,
            ...linkData,
          };

          // TODO:  UNDO REDO ACTIONS?
          break;
        }

        case ReducerTypes.COPY_BLOCKS: {
          const { blockIds, onCopy } = action.payload;
          const blocksDB: BlockDataDB = {};
          blockIds.forEach((id) => {
            blocksDB[id] = state.blocks[id];
          });

          onCopy(blocksDB);
          break;
        }

        case ReducerTypes.MOVE_BLOCKS: {
          const { chainBlockIndexes, chainId, direction } = action.payload;

          const directionFactor = direction === 'up' ? -1 : 1;

          const pivotBlockIndex =
            direction === 'up' ? 0 : chainBlockIndexes.length - 1;
          const swappedBlockIndex =
            chainBlockIndexes[pivotBlockIndex] + directionFactor;
          const swappedBlockId = state.chains[chainId][swappedBlockIndex];

          if (!swappedBlockId) return;

          draft.chains[chainId].splice(
            chainBlockIndexes[pivotBlockIndex] + directionFactor,
            1
          );
          draft.chains[chainId].splice(
            direction === 'up'
              ? chainBlockIndexes.length + swappedBlockIndex
              : chainBlockIndexes[0],
            0,
            swappedBlockId
          );

          break;
        }

        case ReducerTypes.DUPLICATE_BLOCK: {
          const { blockId, chainId, chainBlockIndex } = action.payload;

          const newBlock = { ...state.blocks[blockId] };
          newBlock.id = nanoid();

          addBlocks(draft, [[newBlock, chainId, chainBlockIndex + 1]]);

          focusElementById(`${newBlock.id}_0`);

          break;
        }
        case ReducerTypes.UNDO: {
          const undoAction = changes[currentVersion].undo.action;

          try {
            return produce(
              applyPatches(state, changes[currentVersion--].undo.patch),
              (newDraft) => {
                newDraft.canUndo = changes.hasOwnProperty(currentVersion);
                newDraft.canRedo = true;
                undoAction && undoRedoDispatcher(undoAction);
              }
            );
          } catch (e) {
            console.log(e);
            changes = {};
            currentVersion = -1;
          }
          break;
        }

        case ReducerTypes.REDO: {
          const redoAction = changes[++currentVersion].redo.action;

          try {
            return produce(
              applyPatches(state, changes[currentVersion].redo.patch),
              (newDraft) => {
                newDraft.canUndo = true;
                newDraft.canRedo = changes.hasOwnProperty(currentVersion + 1);
                redoAction && undoRedoDispatcher(redoAction);
              }
            );
          } catch (e) {
            console.log(e);
            changes = {};
            currentVersion = -1;
          }
          break;
        }

        default:
          break;
      }

      if (isUndoableAction(action.type)) {
        draft.canUndo = true;
        draft.canRedo = false;
      }
    },
    (patches, inversePatches) => {
      if (!isUndoableAction(action.type)) return;
      currentVersion++;

      type T = Extract<BlocksDBAction, { type: typeof action.type }>;
      const undoAction = (action as T).undo;
      const redoAction = (action as T).redo;

      changes[currentVersion] = {
        undo: { patch: inversePatches, action: undoAction },
        redo: { patch: patches, action: redoAction },
      };

      delete changes[currentVersion + 1];
      delete changes[currentVersion - noOfVersionsSupported];
      // if (currentVersion > noOfVersionsSupported) {
      //   delete changes[currentVersion - noOfVersionsSupported];
      // }
    }
  );
};

const focusElementById = async (id: string) => {
  (await waitForElement(id))?.focus();
};
