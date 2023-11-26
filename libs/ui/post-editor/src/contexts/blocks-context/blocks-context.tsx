/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useMemo } from 'react';

import { useRefsContext } from '../refs-context';
import { useUtilsUpdaterContext } from '../util-context/util-context';

import type {
  AddBlocks,
  BuildFocusFieldAction,
  BuildModifyFieldInnerHTMLAction,
  BuildModifyListInnerHTMLAction,
  CopyBlocks,
  DuplicateBlock,
  MergeTextFields,
  MoveBlocks,
  RemoveBlocks,
  RemoveLastListItem,
  ReplaceBlocks,
  SetFieldValue,
  SetLinkData,
  SplitTextField,
} from './blocks-context.types';
import type { BlocksDBAction, BlocksDBReducerState } from './blocks-reducer';
import { ReducerTypes } from './blocks-reducer';
import { UndoRedoTypes } from './undo-redo-reducer';

type BlockDataDBContextProps = {
  children: React.ReactNode;
  blocksDB: BlocksDBReducerState;
  dispatchBlocksDB: React.Dispatch<BlocksDBAction>;
};

const BlocksDBConsumerContext = React.createContext<BlocksDBReducerState>({
  blocks: {},
  chains: {},
  canRedo: false,
  canUndo: false,
});

const BlocksDBUpdaterContext = React.createContext<
  | {
      setFieldValue: SetFieldValue;
      removeBlocks: RemoveBlocks;
      addBlocks: AddBlocks;
      replaceBlocks: ReplaceBlocks;
      splitTextField: SplitTextField;
      mergeTextFields: MergeTextFields;
      removeLastListItem: RemoveLastListItem;
      setLinkData: SetLinkData;
      copyBlocks: CopyBlocks;
      moveBlocks: MoveBlocks;
      duplicateBlock: DuplicateBlock;
      undo: () => void;
      redo: () => void;
    }
  | undefined
>(undefined);

export const BlocksDBProvider = ({
  children,
  blocksDB,
  dispatchBlocksDB,
}: BlockDataDBContextProps) => {
  const { setHasMaxImages } = useUtilsUpdaterContext();

  useEffect(() => {
    if (blocksDB?.chains?.main) {
      setHasMaxImages(({ maxImages }) => {
        const blocks = Object.values(blocksDB.blocks);
        const images = blocks.filter((block) => block.type === 'image');

        return {
          maxImages,
          hasMaxImages: images.length >= maxImages,
          numberOfImageBlocks: images.length ?? 0,
        };
      });
    }
  }, [blocksDB, setHasMaxImages]);

  const setFieldValue: SetFieldValue = ({
    blockId,
    field,
    value,
    undo,
    redo,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.MODIFY_FIELD,
      payload: {
        blockId,
        field,
        value,
      },
      undo,
      redo,
    });
  };

  const removeBlocks: RemoveBlocks = ({ toRemoveBlocks, undo, redo }) => {
    dispatchBlocksDB({
      type: ReducerTypes.REMOVE_BLOCKS,
      payload: {
        toRemoveBlocks,
      },
      undo,
      redo,
    });
  };

  const addBlocks: AddBlocks = ({ toAddBlocks, undo, redo }) => {
    dispatchBlocksDB({
      type: ReducerTypes.ADD_BLOCKS,
      payload: {
        toAddBlocks,
      },
      undo,
      redo,
    });
  };

  const replaceBlocks: ReplaceBlocks = ({
    toAddBlocks,
    toRemoveBlocks,
    undo,
    redo,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.REPLACE_BLOCKS,
      payload: {
        toAddBlocks,
        toRemoveBlocks,
      },
      undo,
      redo,
    });
  };

  const splitTextField: SplitTextField = ({
    blockId,
    field,
    chainBlockIndex,
    chainId,
    innerHTML,
    splitedBlockRef,
    undo,
    redo,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.SPLIT_TEXT_FIELD,
      payload: {
        blockId,
        field,
        chainBlockIndex,
        chainId,
        innerHTML,
        splitedBlockRef,
      },
      undo,
      redo,
    });
  };

  const mergeTextFields: MergeTextFields = ({
    mergedBlockRef,
    mergedField,
    mergedFieldRef,
    removedChainBlockIndex,
    removedChainId,
    removedInnerHTML,
    undo,
    redo,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.MERGE_TEXT_FIELDS,
      payload: {
        mergedBlockRef,
        mergedField,
        mergedFieldRef,
        removedChainBlockIndex,
        removedChainId,
        removedInnerHTML,
      },
      undo,
      redo,
    });
  };

  const removeLastListItem: RemoveLastListItem = ({
    blockType,
    chainBlockIndex,
    chainId,
    fieldId,
    items,
    blockId,
    field,
    undo,
    redo,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.REMOVE_LAST_LIST_ITEM,
      payload: {
        blockId,
        field,
        chainBlockIndex,
        chainId,
        fieldId,
        items,
      },
      undo,
      redo,
    });
  };

  const setLinkData: SetLinkData = ({
    blockId,
    description,
    domain,
    imageUrl,
    title,
    url,
  }) => {
    dispatchBlocksDB({
      type: ReducerTypes.MODIFY_LINK_DATA,
      payload: {
        blockId,
        description,
        domain,
        imageUrl,
        title,
        url,
      },
    });
  };

  const copyBlocks: CopyBlocks = ({ blockIds, onCopy }) =>
    dispatchBlocksDB({
      type: ReducerTypes.COPY_BLOCKS,
      payload: {
        blockIds,
        onCopy,
      },
    });

  const moveBlocks: MoveBlocks = ({
    chainBlockIndexes,
    chainId,
    direction,
    redo,
    undo,
  }) =>
    dispatchBlocksDB({
      type: ReducerTypes.MOVE_BLOCKS,
      payload: {
        chainBlockIndexes,
        chainId,
        direction,
      },
      undo,
      redo,
    });

  const duplicateBlock: DuplicateBlock = ({
    blockId,
    chainBlockIndex,
    chainId,
    redo,
    undo,
  }) =>
    dispatchBlocksDB({
      type: ReducerTypes.DUPLICATE_BLOCK,
      payload: {
        blockId,
        chainBlockIndex,
        chainId,
      },
      undo,
      redo,
    });

  const undo = () => dispatchBlocksDB({ type: ReducerTypes.UNDO });
  const redo = () => dispatchBlocksDB({ type: ReducerTypes.REDO });

  const value = useMemo(
    () => ({
      setFieldValue,
      removeBlocks,
      addBlocks,
      replaceBlocks,
      splitTextField,
      mergeTextFields,
      removeLastListItem,
      setLinkData,
      copyBlocks,
      moveBlocks,
      duplicateBlock,
      undo,
      redo,
    }),
    []
  );

  return (
    <BlocksDBConsumerContext.Provider value={blocksDB}>
      <BlocksDBUpdaterContext.Provider value={value}>
        {children}
      </BlocksDBUpdaterContext.Provider>
    </BlocksDBConsumerContext.Provider>
  );
};

export const useBlocksDBConsumerContext = () => {
  const blocksDB = React.useContext(BlocksDBConsumerContext);

  if (typeof blocksDB === 'undefined') {
    throw new Error(
      'useBlocksDBConsumerContext must be used within a BlockDataDBProvider'
    );
  }
  return blocksDB;
};

export const useBlocksDBUpdaterContext = () => {
  const dispatchBlocksDB = React.useContext(BlocksDBUpdaterContext);

  if (typeof dispatchBlocksDB === 'undefined') {
    throw new Error(
      'useBlocksDBUpdaterContext must be used within a BlockDataDBProvider'
    );
  }

  const { prevCaretPosition } = useRefsContext();

  const buildModifyFieldInnerHTMLAction: BuildModifyFieldInnerHTMLAction =
    useCallback(
      ({ fieldId, caretPosition, focusFieldId, value }) => ({
        type: UndoRedoTypes.MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId,
          caretPosition,
          focusFieldId,
          value,
          prevCaretPositionRef: prevCaretPosition,
        },
      }),
      [prevCaretPosition]
    );

  const buildFocusFieldAction: BuildFocusFieldAction = useCallback(
    ({ fieldId, position }) => ({
      type: UndoRedoTypes.FOCUS_FIELD,
      payload: {
        fieldId,
        position,
        prevCaretPositionRef: prevCaretPosition,
      },
    }),
    [prevCaretPosition]
  );

  const buildModifyListInnerHTMLAction: BuildModifyListInnerHTMLAction =
    useCallback(
      ({ caretPosition, fieldId, focusFieldId, value }) => ({
        type: UndoRedoTypes.MODIFY_LIST_INNERHTML,
        payload: {
          caretPosition,
          fieldId,
          focusFieldId,
          value,
          prevCaretPositionRef: prevCaretPosition,
        },
      }),
      [prevCaretPosition]
    );

  return {
    ...dispatchBlocksDB,
    buildFocusFieldAction,
    buildModifyListInnerHTMLAction,
    buildModifyFieldInnerHTMLAction,
  };
};
