import type { Block, EveryBlockFieldKeys } from '../../../post-editor.types';
import type { FocusableElement } from '../../refs-context';
import type { BlockChainDB, BlockDataDB } from '../blocks-context.types';
import type { UndoRedoActionByType } from '../undo-redo-reducer';
import type { UndoRedoAction } from '../undo-redo-reducer/undo-redo-reducer.types';
import { UndoRedoTypes } from '../undo-redo-reducer/undo-redo-reducer.types';
export type BlocksDBReducerState = {
  blocks: BlockDataDB;
  chains: BlockChainDB;
  canUndo: boolean;
  canRedo: boolean;
};

export type toAddChain = {
  chainId: string;
  blockIds: string[];
};

export type ToAddBlock = [Block, string, number]; // [block, chainId, position]
export type ToRemoveBlock = [string, string]; // [blockId, chainId]
export type ToSwapBlock = [string, string]; // [blockId, chainId]

export enum ReducerTypes {
  MODIFY_FIELD = 'MODIFY_FIELD',
  MODIFY_LINK_DATA = 'MODIFY_LINK_DATA',
  REMOVE_BLOCKS = 'REMOVE_BLOCKS',
  ADD_BLOCKS = 'ADD_BLOCKS',
  REPLACE_BLOCKS = 'REPLACE_BLOCKS',
  SPLIT_TEXT_FIELD = 'SPLIT_TEXT_FIELD',
  MERGE_TEXT_FIELDS = 'MERGE_TEXT_FIELDS',
  REMOVE_LAST_LIST_ITEM = 'REMOVE_LAST_LIST_ITEM',
  UNDO = 'UNDO',
  REDO = 'REDO',
  COPY_BLOCKS = 'COPY_BLOCKS',
  MOVE_BLOCKS = 'MOVE_BLOCKS',
  DUPLICATE_BLOCK = 'DUPLICATE_BLOCK',
}

const undoableActions = [
  ReducerTypes.MODIFY_FIELD,
  ReducerTypes.REMOVE_BLOCKS,
  ReducerTypes.ADD_BLOCKS,
  ReducerTypes.REPLACE_BLOCKS,
  ReducerTypes.SPLIT_TEXT_FIELD,
  ReducerTypes.MERGE_TEXT_FIELDS,
  ReducerTypes.REMOVE_LAST_LIST_ITEM,
  ReducerTypes.MOVE_BLOCKS,
  ReducerTypes.DUPLICATE_BLOCK,
] as const;

type UndoableActions = typeof undoableActions[number];
export const isUndoableAction = (x: string): x is UndoableActions => {
  return undoableActions.includes(x as UndoableActions);
};

export type BlocksDBAction =
  | {
      type: ReducerTypes.MODIFY_FIELD;
      payload: {
        blockId: string;
        value: any;
        field: EveryBlockFieldKeys;
      };
      undo?: UndoRedoAction;
      redo?: UndoRedoAction;
    }
  | {
      type: ReducerTypes.REMOVE_BLOCKS;
      payload: {
        toRemoveBlocks: ToRemoveBlock[];
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
      redo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
    }
  | {
      type: ReducerTypes.ADD_BLOCKS;
      payload: {
        toAddBlocks: ToAddBlock[];
        toAddChains?: toAddChain[];
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
      redo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
    }
  | {
      type: ReducerTypes.REPLACE_BLOCKS;
      payload: {
        toRemoveBlocks: ToRemoveBlock[];
        toAddBlocks: ToAddBlock[];
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
      redo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
    }
  | {
      type: ReducerTypes.SPLIT_TEXT_FIELD;
      payload: {
        field: EveryBlockFieldKeys;
        blockId: string;
        chainId: string;
        chainBlockIndex: number;
        innerHTML: string;
        splitedBlockRef: FocusableElement;
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_FIELD_INNERHTML>;
      redo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_FIELD_INNERHTML>;
    }
  | {
      type: ReducerTypes.MERGE_TEXT_FIELDS;
      payload: {
        mergedBlockRef: HTMLDivElement;
        mergedFieldRef: FocusableElement;
        mergedField: EveryBlockFieldKeys;
        removedChainBlockIndex: number;
        removedInnerHTML: string;
        removedChainId: string;
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_FIELD_INNERHTML>;
      redo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_FIELD_INNERHTML>;
    }
  | {
      type: ReducerTypes.REMOVE_LAST_LIST_ITEM;
      payload: {
        blockId: string;
        chainId: string;
        fieldId: string;
        chainBlockIndex: number;
        items: string[];
        field: EveryBlockFieldKeys;
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_LIST_INNERHTML>;
      redo?: UndoRedoActionByType<UndoRedoTypes.MODIFY_LIST_INNERHTML>;
    }
  | {
      type: ReducerTypes.MODIFY_LINK_DATA;
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
      type: ReducerTypes.COPY_BLOCKS;
      payload: {
        blockIds: string[];
        onCopy: (blocksDB: BlockDataDB) => void;
      };
    }
  | {
      type: ReducerTypes.MOVE_BLOCKS;
      payload: {
        chainBlockIndexes: number[];
        chainId: string;
        direction: 'up' | 'down';
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
      redo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
    }
  | {
      type: ReducerTypes.DUPLICATE_BLOCK;
      payload: {
        blockId: string;
        chainId: string;
        chainBlockIndex: number;
      };
      undo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
      redo?: UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;
    }
  | {
      type: ReducerTypes.UNDO;
    }
  | {
      type: ReducerTypes.REDO;
    };
