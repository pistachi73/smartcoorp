import { MutableRefObject, useCallback, useContext } from 'react';

import { useBlockUpdaterContext } from '../contexts/block-context';
import { FocusableElement, RefsContext } from '../contexts/refs-context';
import {
  getCaretPosition,
  getClosestEditableElement,
  getElementTextContent,
  setCaretPosition,
  waitForElement,
} from '../helpers';

export const useRefs = (): {
  refs: any;
  blockRefs: MutableRefObject<HTMLDivElement[]>;
  focusableRefs: MutableRefObject<FocusableElement[][]>;
  flatenFocusableRefs: MutableRefObject<FocusableElement[]>;
  prevCaretPosition: MutableRefObject<number>;
  addBlockRef: (blockIndex: number) => (ref: HTMLDivElement) => void;
  addFocusableRef: (blockIndex: number, index: number) => (ref: FocusableElement) => void;
  focusBlockByIndex: (blockIndex: number, caretPosition: 'start' | 'end' | number) => void;
  getNextFocusableBlock: (
    blockIndex: number,
    focusIndex: number,
    direction: 1 | -1
  ) => [number, number] | null;
  focusElement: (i: [number, number], caretPosition: 'start' | 'end' | number) => void;
  focusContiguousElement: (
    blockIndex: number,
    focusIndex: number,
    direction: 1 | -1,
    caretPosition?: 'start' | 'end' | number
  ) => void;
  setPrevCaretPosition: (ref: any) => void;
  handlePrevTextSelectionOnMouseUp: (e: React.MouseEvent) => void;
  handlePrevTextSelectionOnKeyUp: (e: React.KeyboardEvent) => void;
} => {
  const { refs, blockRefs, focusableRefs, flatenFocusableRefs, prevCaretPosition } =
    useContext(RefsContext);

  if (
    typeof refs === 'undefined' ||
    typeof blockRefs === 'undefined' ||
    typeof focusableRefs === 'undefined' ||
    typeof flatenFocusableRefs === 'undefined' ||
    typeof prevCaretPosition === 'undefined'
  )
    throw new Error('useRefs must be used within a RefsProvider');

  const { insertParagraphBlock } = useBlockUpdaterContext();

  const addBlockRef = (blockIndex: number) => (ref: HTMLDivElement) => {
    blockRefs.current[blockIndex] = ref;
  };

  const addFocusableRef = (blockIndex: number, focusIndex: number) => (ref: FocusableElement) => {
    if (!focusableRefs.current[blockIndex]) {
      focusableRefs.current[blockIndex] = [];
    }

    focusableRefs.current[blockIndex][focusIndex] = ref;
    flatenFocusableRefs.current = focusableRefs.current.flat();
  };

  const setPrevCaretPosition = (ref: any) => {
    prevCaretPosition.current = getCaretPosition(ref);
  };

  const handlePrevTextSelectionOnMouseUp = (e: React.MouseEvent) => {
    const closestEditableElement = getClosestEditableElement(e.target as HTMLElement);
    setPrevCaretPosition(closestEditableElement);
  };

  const handlePrevTextSelectionOnKeyUp = (e: React.KeyboardEvent) => {
    // Esto no esta bien del todo

    if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.metaKey
    ) {
      const closestEditableElement = getClosestEditableElement(e.target as HTMLElement);
      setPrevCaretPosition(closestEditableElement);
    }
  };

  const focusBlockByIndex = useCallback(
    async (blockIndex: number, caretPosition: 'start' | 'end' | number) => {
      if (blockIndex === -1) {
        refs.current[0].focus();
        return;
      }

      if (blockIndex === refs.current.length) {
        const lastBlock = refs.current[blockIndex - 1];
        if (lastBlock.className.includes('paragraph-block')) {
          lastBlock.focus();
        } else {
          const newBlockId = insertParagraphBlock(blockIndex);
          (await waitForElement(newBlockId))?.focus();
        }
        return;
      }

      const block = refs.current[blockIndex];
      const position =
        caretPosition === 'start'
          ? 0
          : caretPosition === 'end'
          ? getElementTextContent(block).length
          : caretPosition;

      setCaretPosition({
        element: block,
        position,
      });
    },
    [refs, insertParagraphBlock]
  );

  const focusElement = useCallback(
    ([blockIndex, focusIndex]: [number, number], caretPosition: 'start' | 'end' | number) => {
      const focusableElement = focusableRefs.current[blockIndex][focusIndex];

      console.log(focusableElement);

      const position =
        caretPosition === 'start'
          ? 0
          : caretPosition === 'end'
          ? getElementTextContent(focusableElement).length
          : caretPosition;

      setCaretPosition({
        element: focusableElement,
        position,
      });
      prevCaretPosition.current = position;
    },
    [focusableRefs, prevCaretPosition]
  );

  const getNextFocusableBlock = useCallback(
    (blockIndex: number, focusIndex: number, direction: 1 | -1): [number, number] | null => {
      const nextFocusIndex = (focusIndex || 0) + direction;

      if (nextFocusIndex < 0 && blockIndex > 0) {
        return [blockIndex - 1, focusableRefs.current[blockIndex - 1].length - 1];
      }

      if (nextFocusIndex > -1 && nextFocusIndex < focusableRefs.current[blockIndex].length) {
        return [blockIndex, nextFocusIndex];
      }

      if (
        nextFocusIndex === focusableRefs.current[blockIndex].length &&
        blockIndex < blockRefs.current.length - 1
      ) {
        return [blockIndex + 1, 0];
      }

      return null;
    },
    [blockRefs, focusableRefs]
  );

  const focusContiguousElement = useCallback(
    (
      blockIndex: number,
      focusIndex: number,
      direction: 1 | -1,
      caretPosition?: 'end' | 'start' | number
    ) => {
      const nextFocusableBlock = getNextFocusableBlock(blockIndex, focusIndex, direction);

      if (nextFocusableBlock) {
        focusElement(
          nextFocusableBlock,
          caretPosition ? caretPosition : direction === 1 ? 'start' : 'end'
        );
      }
    },
    [focusElement, getNextFocusableBlock]
  );

  return {
    refs,
    blockRefs,
    focusableRefs,
    flatenFocusableRefs,
    prevCaretPosition,
    addBlockRef,
    addFocusableRef,
    focusBlockByIndex,
    focusElement,
    focusContiguousElement,
    getNextFocusableBlock,
    setPrevCaretPosition,
    handlePrevTextSelectionOnMouseUp,
    handlePrevTextSelectionOnKeyUp,
  };
};
