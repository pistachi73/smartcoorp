import { Patch } from 'immer';

import {
  FOCUS_FIELD,
  MODIFY_FIELD_INNERHTML,
  MODIFY_LIST_INNERHTML,
} from './actions';

export type UndoRedoAction =
  | {
      type: typeof MODIFY_FIELD_INNERHTML;
      payload: {
        fieldId: string;
        caretPosition: number;
        setPrevCaretPosition: (position: number) => void;
        value?: string;
        focusFieldId?: string;
      };
    }
  | {
      type: typeof MODIFY_LIST_INNERHTML;
      payload: {
        fieldId: string;
        caretPosition: number;
        setPrevCaretPosition: (position: number) => void;
        value?: string[];
        focusFieldId?: string;
      };
    }
  | {
      type: typeof FOCUS_FIELD;
      payload: {
        fieldId: string;
        position: number | 'start' | 'end';
        setPrevCaretPosition: (position: number) => void;
      };
    };

export type UndoRedoActionByType<T extends UndoRedoAction['type']> = Extract<
  UndoRedoAction,
  { type: T }
>;

export type UndoRedoChanges = {
  [key: string]: {
    undo: { patch: Patch[]; action?: UndoRedoAction };
    redo: { patch: Patch[]; action?: UndoRedoAction };
  };
};
