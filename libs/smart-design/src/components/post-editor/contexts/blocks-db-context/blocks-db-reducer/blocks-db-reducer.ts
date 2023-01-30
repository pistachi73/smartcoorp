/* eslint-disable no-prototype-builtins */
import produce, { applyPatches, enablePatches } from 'immer';

import {
  buildParagraphBlock,
  getBlockContainerAttributes,
  getElementTextContent,
  getHTMLStringTextContent,
  waitForElement,
} from '../../../helpers';
import { setCaretPosition } from '../../../helpers/set-caret-position';
import { EveryBlockFields } from '../../../post-editor.types';
import { BlockDataDB } from '../blocks-db.types';
import type { UndoRedoChanges } from '../undo-redo-reducer';
import { undoRedoDispatcher } from '../undo-redo-reducer/undo-redo-reducer';

import {
  ADD_BLOCKS,
  COPY_BLOCKS,
  MERGE_TEXT_FIELDS,
  MODIFY_FIELD,
  MODIFY_LINK_DATA,
  REDO,
  REMOVE_BLOCKS,
  REMOVE_LAST_LIST_ITEM,
  REPLACE_BLOCKS,
  SPLIT_TEXT_FIELD,
  UNDO,
} from './actions';
import {
  BlocksDBAction,
  BlocksDBReducerState,
  isUndoableAction,
} from './blocks-db-reducer.types';
import { addBlocks, removeBlocks } from './blocks-db.functions';

enablePatches();

let currentVersion = -1;
const noOfVersionsSupported = 15;
const changes: UndoRedoChanges = {};

export const blocksDBReducer = (
  state: BlocksDBReducerState,
  action: BlocksDBAction
) => {
  return produce(
    state,
    (draft) => {
      switch (action.type) {
        case MODIFY_FIELD: {
          const { field, blockId, value } = action.payload;

          console.log('MODIFY_FIELD', field, blockId, value);
          (draft.blocks[blockId].data as EveryBlockFields)[field] = value;

          // Update undo and redo actions
          const currentVal = (state.blocks[blockId].data as EveryBlockFields)[
            field
          ];

          if (action.payload.undoAction && action.payload.redoAction) {
            action.payload.undoAction.payload.value =
              (currentVal as typeof value) ?? null;
            action.payload.redoAction.payload.value = value;
          }

          break;
        }

        case REMOVE_BLOCKS: {
          removeBlocks(draft, action.payload.toRemoveBlocks);
          break;
        }

        case ADD_BLOCKS: {
          addBlocks(draft, action.payload.toAddBlocks);
          break;
        }

        case REPLACE_BLOCKS: {
          addBlocks(draft, action.payload.toAddBlocks);
          removeBlocks(draft, action.payload.toRemoveBlocks);
          break;
        }

        case SPLIT_TEXT_FIELD: {
          const {
            field,
            blockId,
            chainId,
            innerHTML,
            splitedBlockRef,
            chainBlockIndex,
          } = action.payload;

          console.log(innerHTML);
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
          if (action.payload.undoAction && action.payload.redoAction) {
            action.payload.undoAction.payload.value = (
              state.blocks[blockId].data as EveryBlockFields
            )[field] as string;
            action.payload.redoAction.payload.focusFieldId = `${newBlock.id}_0`;
            action.payload.redoAction.payload.value = textBeforeCaret;
          }
          break;
        }

        case MERGE_TEXT_FIELDS: {
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
          const mergedFieldTextContentLength =
            getElementTextContent(mergedFieldRef).length;
          const newHTML = `${mergedFieldInnerHTML}${removedInnerHTML}`.trim();

          (draft.blocks[mergedBlockId].data as EveryBlockFields)[mergedField] =
            newHTML as any;

          draft.chains[removedChainId].splice(removedChainBlockIndex, 1);
          mergedFieldRef.innerHTML = newHTML;

          setCaretPosition({
            element: mergedFieldRef,
            position: mergedFieldTextContentLength,
          });

          if (action.payload.undoAction && action.payload.redoAction) {
            // Update undo and redo actions
            action.payload.undoAction.payload.value = mergedFieldInnerHTML;
            action.payload.redoAction.payload.value = newHTML;
          }
          break;
        }

        case REMOVE_LAST_LIST_ITEM: {
          const { items, blockId, chainId, field, fieldId, chainBlockIndex } =
            action.payload;

          const fieldRef = document.getElementById(fieldId) as HTMLElement;

          items.pop();

          (draft.blocks[blockId].data as EveryBlockFields)[field] =
            items as any;

          if (items.length === 0) {
            removeBlocks(draft, [[blockId, chainId]]);
          }

          const newBlock = buildParagraphBlock(chainId);

          addBlocks(draft, [[newBlock, chainId, chainBlockIndex + 1]]);

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

          focusElementById(`${newBlock.id}_0`);

          // Update undo and redo actions
          if (action.payload.undoAction && action.payload.redoAction) {
            action.payload.undoAction.payload.value = (
              state.blocks[blockId].data as EveryBlockFields
            )[field] as string[];
            action.payload.redoAction.payload.focusFieldId = `${newBlock.id}_0`;
            action.payload.redoAction.payload.value = items;
          }

          break;
        }

        case MODIFY_LINK_DATA: {
          const { blockId, ...linkData } = action.payload;

          draft.blocks[blockId].data = {
            ...draft.blocks[blockId].data,
            ...linkData,
          };

          // TODO:  UNDO REDO ACTIONS?
          break;
        }

        case COPY_BLOCKS: {
          const { blockIds, onCopy } = action.payload;
          const blocksDB: BlockDataDB = {};
          blockIds.forEach((id) => {
            blocksDB[id] = state.blocks[id];
          });

          onCopy(blocksDB);
          break;
        }
        case UNDO: {
          const undoAction = changes[currentVersion].undo.action;

          return produce(
            applyPatches(state, changes[currentVersion--].undo.patch),
            (newDraft) => {
              newDraft.canUndo = changes.hasOwnProperty(currentVersion);
              newDraft.canRedo = true;
              undoAction && undoRedoDispatcher(undoAction);
            }
          );
        }

        case REDO: {
          const redoAction = changes[++currentVersion].redo.action;

          return produce(
            applyPatches(state, changes[currentVersion].redo.patch),
            (newDraft) => {
              newDraft.canUndo = true;
              newDraft.canRedo = changes.hasOwnProperty(currentVersion + 1);
              redoAction && undoRedoDispatcher(redoAction);
            }
          );
        }

        default:
          break;
      }

      if (isUndoableAction(action.type)) {
        console.log('undoable action');
        draft.canUndo = true;
        draft.canRedo = false;
      }
    },
    (patches, inversePatches) => {
      if (!isUndoableAction(action.type)) return;
      currentVersion++;

      type T = Extract<BlocksDBAction, { type: typeof action.type }>;
      const undoAction = (action as T).payload.undoAction;
      const redoAction = (action as T).payload.redoAction;

      changes[currentVersion] = {
        undo: { patch: inversePatches, action: undoAction },
        redo: { patch: patches, action: redoAction },
      };

      console.log(changes);

      if (currentVersion > noOfVersionsSupported) {
        delete changes[currentVersion - noOfVersionsSupported];
      }
    }
  );
};

const focusElementById = async (id: string) => {
  (await waitForElement(id))?.focus();
};
