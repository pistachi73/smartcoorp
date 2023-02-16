import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
} from 'react';

import {
  getCaretPosition,
  getClosestEditableElement,
  getElementTextContent,
  setCaretPosition,
} from '../../helpers';

import type {
  AddBlockRef,
  AddFieldRef,
  BlockRefs,
  FieldRefs,
  FocusField,
  FocusableElement,
  GetNextFocusableField,
} from './refs.types';

export const RefsContext = React.createContext<{
  blockRefs: React.MutableRefObject<BlockRefs>;
  fieldRefs: React.MutableRefObject<FieldRefs>;
  prevCaretPosition?: React.MutableRefObject<number>;
}>({
  blockRefs: { current: [] },
  fieldRefs: { current: [] },
  prevCaretPosition: { current: 0 },
});

export const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const blockRefs = useRef<BlockRefs>([]);
  const fieldRefs = useRef<FieldRefs>([]);
  const prevCaretPosition = useRef<number>(0);

  const value = React.useMemo(
    () => ({
      blockRefs,
      fieldRefs,
      prevCaretPosition,
    }),
    []
  );

  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};

export const useRefsContext = (): {
  blockRefs: MutableRefObject<BlockRefs>;
  fieldRefs: MutableRefObject<FieldRefs>;
  prevCaretPosition: MutableRefObject<number>;
  addBlockRef: AddBlockRef;
  addFieldRef: AddFieldRef;
  getNextFocusableField: GetNextFocusableField;
  focusField: FocusField;
  focusContiguousField: (
    blockIndex: number,
    fieldIndex: number,
    direction: 1 | -1,
    caretPosition?: 'start' | 'end' | number
  ) => [number, number];
  setPrevCaretPosition: (ref: any) => void;
  handlePrevTextSelectionOnMouseUp: (e: React.MouseEvent) => void;
  handlePrevTextSelectionOnKeyUp: (e: React.KeyboardEvent) => void;
} => {
  const { blockRefs, fieldRefs, prevCaretPosition } = useContext(RefsContext);

  if (
    typeof blockRefs === 'undefined' ||
    typeof fieldRefs === 'undefined' ||
    typeof prevCaretPosition === 'undefined'
  )
    throw new Error('useRefsContext must be used within a RefsProvider');

  // const { insertParagraphBlock } = useBlockUpdaterContext();

  const addBlockRef: AddBlockRef = useCallback(
    (blockIndex) => (ref) => {
      blockRefs.current[blockIndex] = ref;
    },
    [blockRefs]
  );

  const addFieldRef: AddFieldRef = useCallback(
    (blockIndex, fieldIndex) => (ref) => {
      if (!fieldRefs.current[blockIndex]) {
        fieldRefs.current[blockIndex] = [];
      }

      fieldRefs.current[blockIndex][fieldIndex] = ref;
    },
    [fieldRefs]
  );

  const setPrevCaretPosition = useCallback(
    (ref: any) => {
      if (typeof ref === 'number') {
        prevCaretPosition.current = ref;
      } else {
        prevCaretPosition.current = getCaretPosition(ref);
      }
    },
    [prevCaretPosition]
  );

  const handlePrevTextSelectionOnMouseUp = (e: React.MouseEvent) => {
    const closestEditableElement = getClosestEditableElement(
      e.target as HTMLElement
    );
    setPrevCaretPosition(closestEditableElement);
  };

  const handlePrevTextSelectionOnKeyUp = (e: React.KeyboardEvent) => {
    if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.metaKey
    ) {
      const closestEditableElement = getClosestEditableElement(
        e.target as HTMLElement
      );
      setPrevCaretPosition(closestEditableElement);
    }
  };

  const focusField: FocusField = useCallback(
    ([blockIndex, fieldIndex], caretPosition) => {
      const focusableElement = fieldRefs.current[blockIndex][fieldIndex];

      let position: number;
      if (typeof caretPosition === 'number') {
        position = caretPosition;
      } else {
        position =
          caretPosition === 'start'
            ? 0
            : getElementTextContent(focusableElement).length;
      }

      setCaretPosition({
        element: focusableElement,
        position,
      });
      prevCaretPosition.current = position;
    },
    [fieldRefs, prevCaretPosition]
  );

  const getNextFocusableField: GetNextFocusableField = useCallback(
    (blockIndex, fieldIndex, direction) => {
      const nextFocusIndex = (fieldIndex || 0) + direction;

      if (nextFocusIndex < 0 && blockIndex === 0) {
        //TODO: return 1 if first block deleted???
        return [1, 0];
      }
      if (nextFocusIndex < 0 && blockIndex > 0) {
        return [blockIndex - 1, fieldRefs.current[blockIndex - 1].length - 1];
      }

      if (
        nextFocusIndex > -1 &&
        nextFocusIndex < fieldRefs.current[blockIndex].length
      ) {
        return [blockIndex, nextFocusIndex];
      }

      if (
        nextFocusIndex === fieldRefs.current[blockIndex].length &&
        blockIndex < Object.keys(blockRefs.current).length - 1
      ) {
        return [blockIndex + 1, 0];
      }

      return [blockIndex, fieldRefs.current[blockIndex].length - 1];
    },
    [blockRefs, fieldRefs]
  );

  const focusContiguousField = useCallback(
    (
      blockIndex: number,
      fieldIndex: number,
      direction: 1 | -1,
      caretPosition?: 'end' | 'start' | number
    ): [number, number] => {
      const nextFocusableBlock = getNextFocusableField(
        blockIndex,
        fieldIndex,
        direction
      );

      focusField(
        nextFocusableBlock,
        caretPosition ? caretPosition : direction === 1 ? 'start' : 'end'
      );

      return nextFocusableBlock;
    },
    [focusField, getNextFocusableField]
  );

  return {
    blockRefs,
    fieldRefs,
    prevCaretPosition,
    addBlockRef,
    addFieldRef,
    focusField,
    focusContiguousField,
    getNextFocusableField,
    setPrevCaretPosition,
    handlePrevTextSelectionOnMouseUp,
    handlePrevTextSelectionOnKeyUp,
  };
};
