import {
  getElementTextContent,
  setCaretPosition,
  waitForElement,
} from '../../../helpers';

import type { UndoRedoAction } from './undo-redo-reducer.types';
import { UndoRedoTypes } from './undo-redo-reducer.types';

export const undoRedoDispatcher = async (action: UndoRedoAction) => {
  if (!action) return;

  switch (action.type) {
    case UndoRedoTypes.MODIFY_FIELD_INNERHTML: {
      const {
        fieldId,
        focusFieldId,
        value,
        prevCaretPositionRef,
        caretPosition,
      } = action.payload;

      const fieldElement = document.getElementById(fieldId);
      const focusFieldElement = focusFieldId
        ? await waitForElement(focusFieldId)
        : fieldElement;

      if (!fieldElement || !focusFieldElement || typeof value === 'undefined') {
        return;
      }

      prevCaretPositionRef.current = caretPosition;
      fieldElement.innerHTML = value;

      setCaretPosition({ element: focusFieldElement, position: caretPosition });

      break;
    }

    case UndoRedoTypes.MODIFY_LIST_INNERHTML: {
      const {
        fieldId,
        value,
        caretPosition,
        prevCaretPositionRef,
        focusFieldId,
      } = action.payload;
      const fieldElement = document.getElementById(fieldId);

      const focusFieldElement = focusFieldId
        ? await waitForElement(focusFieldId)
        : fieldElement;

      if (!fieldElement || !focusFieldElement || typeof value !== 'object')
        return;

      const itemsLength = value.length;
      const childrenLength = fieldElement.children.length;

      if (itemsLength > childrenLength) {
        for (let i = 0; i < childrenLength; i++) {
          fieldElement.children[i].innerHTML = value[i] || '';
        }
        for (let i = childrenLength; i < itemsLength; i++) {
          const li = document.createElement('li');
          li.innerHTML = value[i] || '';
          fieldElement.appendChild(li);
        }
      } else {
        for (let i = 0; i < itemsLength; i++) {
          fieldElement.children[i].innerHTML = value[i] || '';
        }
        for (let i = itemsLength, c = 0; i < childrenLength; i++, c++) {
          fieldElement.children[i - c].remove();
        }
      }

      prevCaretPositionRef.current = caretPosition;
      setCaretPosition({
        element: focusFieldElement,
        position: caretPosition,
      });

      break;
    }
    case UndoRedoTypes.FOCUS_FIELD: {
      const { fieldId, position, prevCaretPositionRef } = action.payload;
      const field = await waitForElement(fieldId);
      const fieldElement = document.getElementById(fieldId);

      let caretPosition: number;

      if (!field || !fieldElement) return;

      if (typeof position === 'number') {
        caretPosition = position;
      } else {
        caretPosition =
          position === 'start' ? 0 : getElementTextContent(field).length;
      }

      prevCaretPositionRef.current = caretPosition;
      setCaretPosition({ element: fieldElement, position: caretPosition });
    }
  }
};
