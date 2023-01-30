import type { Block, EveryBlockFieldKeys } from '../../../post-editor.types';
import type { FocusableElement } from '../../refs-context';
import type { BlockChainDB, BlockDataDB } from '../blocks-db.types';
import type { UndoRedoActionByType } from '../undo-redo-reducer';
import {
  FOCUS_FIELD,
  MODIFY_FIELD_INNERHTML,
  MODIFY_LIST_INNERHTML,
} from '../undo-redo-reducer';

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
  undoableActions,
} from './actions';

export type BlocksDBReducerState = {
  blocks: BlockDataDB;
  chains: BlockChainDB;
  canUndo: boolean;
  canRedo: boolean;
};

export type ToAddBlock = [Block, string, number]; // [block, chainId, position]
export type ToRemoveBlock = [string, string]; // [blockId, chainId]

export type BlocksDBAction =
  | {
      type: typeof MODIFY_FIELD;
      payload: {
        field: EveryBlockFieldKeys;
        blockId: string;
        value: any;
        undoAction?:
          | UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>
          | UndoRedoActionByType<typeof MODIFY_LIST_INNERHTML>;
        redoAction?:
          | UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>
          | UndoRedoActionByType<typeof MODIFY_LIST_INNERHTML>;
      };
    }
  | {
      type: typeof REMOVE_BLOCKS;
      payload: {
        toRemoveBlocks: ToRemoveBlock[];
        undoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
        redoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
      };
    }
  | {
      type: typeof ADD_BLOCKS;
      payload: {
        toAddBlocks: ToAddBlock[];
        undoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
        redoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
      };
    }
  | {
      type: typeof REPLACE_BLOCKS;
      payload: {
        toRemoveBlocks: ToRemoveBlock[];
        toAddBlocks: ToAddBlock[];
        undoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
        redoAction?: UndoRedoActionByType<typeof FOCUS_FIELD>;
      };
    }
  | {
      type: typeof SPLIT_TEXT_FIELD;
      payload: {
        field: EveryBlockFieldKeys;
        blockId: string;
        chainId: string;
        chainBlockIndex: number;
        innerHTML: string;
        splitedBlockRef: FocusableElement;
        undoAction?: UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>;
        redoAction?: UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>;
      };
    }
  | {
      type: typeof MERGE_TEXT_FIELDS;
      payload: {
        mergedBlockRef: HTMLDivElement;
        mergedFieldRef: FocusableElement;
        mergedField: EveryBlockFieldKeys;
        removedChainBlockIndex: number;
        removedInnerHTML: string;
        removedChainId: string;
        undoAction?: UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>;
        redoAction?: UndoRedoActionByType<typeof MODIFY_FIELD_INNERHTML>;
      };
    }
  | {
      type: typeof REMOVE_LAST_LIST_ITEM;
      payload: {
        blockId: string;
        chainId: string;
        fieldId: string;
        chainBlockIndex: number;
        items: string[];
        field: EveryBlockFieldKeys;
        undoAction?: UndoRedoActionByType<typeof MODIFY_LIST_INNERHTML>;
        redoAction?: UndoRedoActionByType<typeof MODIFY_LIST_INNERHTML>;
      };
    }
  | {
      type: typeof MODIFY_LINK_DATA;
      payload: {
        blockId: string;
        url: string;
        domain: string;
        title: string;
        description: string;
        imageUrl: string;
      };
    }
  | {
      type: typeof COPY_BLOCKS;
      payload: {
        blockIds: string[];
        onCopy: (blocksDB: BlockDataDB) => void;
      };
    }
  | {
      type: typeof UNDO;
    }
  | {
      type: typeof REDO;
    };

type UndoableActions = typeof undoableActions[number];
export const isUndoableAction = (x: string): x is UndoableActions => {
  return undoableActions.includes(x as UndoableActions);
};
