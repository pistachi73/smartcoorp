import { MutableRefObject } from 'react';

import {
  Block,
  BlockFieldKeys,
  BlockFieldType,
  BlockType,
} from '../../post-editor.types';
import { FocusableElement } from '../refs-context';

import type {
  BlocksDBAction,
  ToAddBlock,
  ToRemoveBlock,
} from './blocks-reducer/blocks-reducer.types';
import { ReducerTypes } from './blocks-reducer/blocks-reducer.types';
import type { UndoRedoAction, UndoRedoActionByType } from './undo-redo-reducer';
import { UndoRedoTypes } from './undo-redo-reducer';

export type BlockDataDB = {
  [id: string]: Block;
};

export type BlockChainDB = {
  [chainId: string]: string[];
};

export type BlocksDB = {
  blocks: BlockDataDB;
  chains: BlockChainDB;
};

export type SetFieldValue = <T extends BlockType, F extends BlockFieldKeys<T>>({
  blockType,
  blockId,
  field,
  value,
}: {
  blockId: string;
  blockType: T;
  field: F;
  value: BlockFieldType<T, any>;
  undo?: UndoRedoAction;
  redo?: UndoRedoAction;
}) => void;

export type RemoveBlocks = ({
  toRemoveBlocks,
}: {
  toRemoveBlocks: ToRemoveBlock[];
  undo?: Extract<BlocksDBAction, { type: ReducerTypes.REMOVE_BLOCKS }>['undo'];
  redo?: Extract<BlocksDBAction, { type: ReducerTypes.REMOVE_BLOCKS }>['redo'];
}) => void;

export type AddBlocks = ({
  toAddBlocks,
}: {
  toAddBlocks: ToAddBlock[];
  undo?: Extract<BlocksDBAction, { type: ReducerTypes.ADD_BLOCKS }>['undo'];
  redo?: Extract<BlocksDBAction, { type: ReducerTypes.ADD_BLOCKS }>['redo'];
}) => void;

export type ReplaceBlocks = ({
  toAddBlocks,
  toRemoveBlocks,
  undo,
  redo,
}: {
  toAddBlocks: ToAddBlock[];
  toRemoveBlocks: ToRemoveBlock[];
  undo?: Extract<BlocksDBAction, { type: ReducerTypes.REPLACE_BLOCKS }>['undo'];
  redo?: Extract<BlocksDBAction, { type: ReducerTypes.REPLACE_BLOCKS }>['redo'];
}) => void;

export type SplitTextField = <T extends BlockType>({
  blockType,
  blockId,
  chainId,
  chainBlockIndex,
  innerHTML,
  splitedBlockRef,
  undo,
  redo,
}: {
  blockType: T;
  field: BlockFieldKeys<T>;
  blockId: string;
  chainId: string;
  chainBlockIndex: number;
  innerHTML: string;
  splitedBlockRef: FocusableElement;
  undo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.SPLIT_TEXT_FIELD }
  >['undo'];
  redo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.SPLIT_TEXT_FIELD }
  >['redo'];
}) => void;

export type MergeTextFields = <T extends BlockType>({
  blockType,
  mergedBlockRef,
  mergedFieldRef,
  mergedField,
  removedChainBlockIndex,
  removedInnerHTML,
  removedChainId,
  undo,
  redo,
}: {
  blockType: T;
  mergedField: BlockFieldKeys<T>;
  mergedBlockRef: HTMLDivElement;
  mergedFieldRef: FocusableElement;
  removedChainBlockIndex: number;
  removedInnerHTML: string;
  removedChainId: string;
  undo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.MERGE_TEXT_FIELDS }
  >['undo'];
  redo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.MERGE_TEXT_FIELDS }
  >['redo'];
}) => void;

export type RemoveLastListItem = <T extends BlockType>({
  blockType,
  blockId,
  chainId,
  chainBlockIndex,
  field,
  items,
  undo,
  redo,
}: {
  blockType: T;
  field: BlockFieldKeys<T>;
  blockId: string;
  chainId: string;
  fieldId: string;
  chainBlockIndex: number;
  items: string[];
  undo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.REMOVE_LAST_LIST_ITEM }
  >['undo'];
  redo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.REMOVE_LAST_LIST_ITEM }
  >['redo'];
}) => void;

export type SetLinkData = ({
  blockId,
  url,
  domain,
  title,
  description,
  imageUrl,
}: {
  blockId: string;
  url: string;
  domain: string;
  title: string;
  description: string;
  imageUrl: string;
}) => void;

export type CopyBlocks = ({
  blockIds,
  onCopy,
}: {
  blockIds: string[];
  onCopy: (blocksDB: BlockDataDB) => void;
}) => void;

export type MoveBlocks = ({
  chainBlockIndexes,
  chainId,
  direction,
  undo,
  redo,
}: {
  chainBlockIndexes: number[];
  chainId: string;
  direction: 'up' | 'down';
  undo?: Extract<BlocksDBAction, { type: ReducerTypes.MOVE_BLOCKS }>['undo'];
  redo?: Extract<BlocksDBAction, { type: ReducerTypes.MOVE_BLOCKS }>['redo'];
}) => void;

export type DuplicateBlock = ({
  blockId,
  chainId,
  chainBlockIndex,
  undo,
  redo,
}: {
  blockId: string;
  chainId: string;
  chainBlockIndex: number;
  undo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.DUPLICATE_BLOCK }
  >['undo'];

  redo?: Extract<
    BlocksDBAction,
    { type: ReducerTypes.DUPLICATE_BLOCK }
  >['redo'];
}) => void;

export type BuildFocusFieldAction = ({
  fieldId,
  position,
}: {
  fieldId: string;
  position: number | 'start' | 'end';
}) => UndoRedoActionByType<UndoRedoTypes.FOCUS_FIELD>;

export type BuildModifyFieldInnerHTMLAction = ({
  fieldId,
  caretPosition,
  value,
  focusFieldId,
}: {
  fieldId: string;
  caretPosition: number;
  value?: string;
  focusFieldId?: string;
}) => UndoRedoActionByType<UndoRedoTypes.MODIFY_FIELD_INNERHTML>;

export type BuildModifyListInnerHTMLAction = ({
  fieldId,
  caretPosition,
  value,
  focusFieldId,
}: {
  fieldId: string;
  caretPosition: number;
  value?: string[];
  focusFieldId?: string;
}) => UndoRedoActionByType<UndoRedoTypes.MODIFY_LIST_INNERHTML>;
