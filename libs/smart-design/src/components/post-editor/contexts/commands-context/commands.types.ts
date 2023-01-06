import {
  Block,
  EveryBlockFieldKeys,
  HeaderBlockProps,
  ParagraphBlockProps,
} from '../../post-editor.types';
import { FocusableElement } from '../refs-context';

export type CommandAction =
  | {
      type: 'editTextField';
      payload: {
        fieldId: string;
        blockIndex: number;
        ref: FocusableElement;
        caretPosition: number;
        field: EveryBlockFieldKeys;
        text: string;
      };
    }
  | {
      type: 'editListField';
      payload: {
        blockIndex: number;
        ref: FocusableElement;
        fieldId: string;
        items: string[];
        caretPosition: number;
      };
    }
  | {
      type: 'splitTextBlock';
      payload: {
        ref: FocusableElement; //Ref of the paragraph block in which the split was performed
        fieldId: string;
        blockIndex: number; //Block index of the paragraph block in which the split was performed
        field: EveryBlockFieldKeys;
        text: string;
        createdBlock: ParagraphBlockProps | HeaderBlockProps;
      };
    }
  | {
      type: 'mergeTextBlock';
      payload: {
        blockIndex: number; //Block index of the paragraph block in which the previous block was merged
        fieldId: string;
        ref: FocusableElement;
        field: EveryBlockFieldKeys;
        text: string;
        caretPosition: number;
      };
    }
  | {
      type: 'addBlocks';
      payload: {
        startingBlockIndex: number;
        blocks: Block[];
      };
    }
  | {
      type: 'removeBlocks';
      payload: {
        removedBlocksIndexes: number[];
      };
    }
  | {
      type: 'replaceBlocks';
      payload: {
        startingBlockIndex: number;
        removedBlocksIndexes: number[];
        addedBlocks: Block[];
        focusBlockIndex?: number;
      };
    }
  | {
      type: 'swapBlocks';
      payload: {
        swapedBlocksIndexes: [number[], number[]];
        selectedBlocks?: number[];
      };
    };

export type CommandType = CommandAction['type'];
export type CommandPayload<T extends CommandType> = Extract<CommandAction, { type: T }>['payload'];

export type Command = {
  action: CommandAction;
  inverse: CommandAction;
};

export type CommandActionDispatcher = {
  [T in CommandType]: (data: CommandPayload<T>) => void;
};

export type DispatchCommand =
  | {
      type: 'editTextField';
      ref: FocusableElement;
      fieldId: string;
      blockIndex: number;
      field: EveryBlockFieldKeys;
    }
  | {
      type: 'editListField';
      ref: FocusableElement;
      blockIndex: number;
      fieldId: string;
      field: EveryBlockFieldKeys;
    }
  | {
      type: 'splitTextBlock';
      ref: FocusableElement;
      fieldId: string;
      blockIndex: number;
      field: EveryBlockFieldKeys;
      createdParagraphBlock: {
        text: string;
        id: string;
      };
    }
  | {
      type: 'removeBlocks';
      startingBlockIndex: number;
      blocksRemovedIndexes: number[];
      blocks: Block[];
    }
  | {
      type: 'replaceBlocks';
      startingBlockIndex: number;
      removedBlocksIndexes: number[];
      addedBlocksIndexes: number[];
      addedBlocks: Block[];
      removedBlocks: Block[];
    };
