import { Patch } from 'immer';

export enum UndoRedoTypes {
  MODIFY_FIELD_INNERHTML = 'MODIFY_FIELD_INNERHTML',
  MODIFY_LIST_INNERHTML = 'MODIFY_LIST_INNERHTML',
  FOCUS_FIELD = 'FOCUS_FIELD',
}

export type UndoRedoAction =
  | {
      type: UndoRedoTypes.MODIFY_FIELD_INNERHTML;
      payload: {
        fieldId: string;
        caretPosition: number;
        setPrevCaretPosition: (position: number) => void;
        value?: string;
        focusFieldId?: string;
      };
    }
  | {
      type: UndoRedoTypes.MODIFY_LIST_INNERHTML;
      payload: {
        fieldId: string;
        caretPosition: number;
        setPrevCaretPosition: (position: number) => void;
        value?: string[];
        focusFieldId?: string;
      };
    }
  | {
      type: UndoRedoTypes.FOCUS_FIELD;
      payload: {
        fieldId: string;
        position: number | 'start' | 'end';
        setPrevCaretPosition: (position: number) => void;
      };
    };

export type UndoRedoActionByType<T extends UndoRedoTypes> = Extract<
  UndoRedoAction,
  { type: T }
>;

export type UndoRedoChanges = {
  [key: string]: {
    undo: { patch: Patch[]; action?: UndoRedoAction };
    redo: { patch: Patch[]; action?: UndoRedoAction };
  };
};
