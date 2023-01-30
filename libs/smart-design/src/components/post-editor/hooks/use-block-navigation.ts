import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../contexts/refs-context';
import { useUpdateTool } from '../contexts/tool-context';
import { getCaretPosition } from '../helpers';

type UseblockNavigationResult = {
  handleKeyboardBlockNavigation: (event: React.KeyboardEvent) => void;
};

export const useBlockNavigation = (
  blockIndex: number
): UseblockNavigationResult => {
  const { getNextFocusableField, focusField } = useRefsContext();
  const { selectedBlocks } = useBlockSelectionConsumerContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const setTool = useUpdateTool();

  const handleArrowDownRight = (e: React.KeyboardEvent) => {
    const caretPosition = getCaretPosition(e.target);
    const element = e.target as HTMLElement;

    if (selectedBlocks.length > 0) {
      e.preventDefault();
      focusField([selectedBlocks[selectedBlocks.length - 1], 0], 'end');
      setSelectedBlocks([]);
      return;
    }

    if (caretPosition === element.textContent?.length) {
      e.preventDefault();
      setTool(null);
      const nextFocusIndexes = getNextFocusableField(
        blockIndex,
        parseInt(
          (e.target as HTMLElement).getAttribute('data-focus-index') as string
        ),
        1
      );

      if (!nextFocusIndexes) return;

      focusField(nextFocusIndexes, 'start');
    }
  };

  const handleArrowUpLeftBackspace = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const caretPosition = getCaretPosition(target);

    if (selectedBlocks.length > 0) {
      e.preventDefault();
      focusField([selectedBlocks[0], 0], 'end');
      setSelectedBlocks([]);
      return;
    }

    if (caretPosition === 0) {
      e.preventDefault();
      setTool(null);
      const nextFocusIndexes = getNextFocusableField(
        blockIndex,
        parseInt(target.getAttribute('data-focus-index') as string),
        -1
      );
      console.log(nextFocusIndexes);

      if (!nextFocusIndexes) return;

      focusField(nextFocusIndexes, 'end');
    }
  };

  const handleKeyboardBlockNavigation = (e: React.KeyboardEvent) => {
    const sharedCondition = !e.shiftKey && !e.metaKey && !e.ctrlKey;

    if (sharedCondition && (e.key === 'ArrowDown' || e.key === 'ArrowRight')) {
      handleArrowDownRight(e);
    }

    if (
      sharedCondition &&
      (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'Backspace')
    ) {
      handleArrowUpLeftBackspace(e);
    }
  };

  return { handleKeyboardBlockNavigation };
};
