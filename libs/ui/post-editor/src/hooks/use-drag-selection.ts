import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from '@air/react-drag-to-select';
import { JSXElementConstructor, ReactElement, useState } from 'react';

import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context';
import { useRefsContext } from '../contexts/refs-context';

type UseDragSelectionResult = {
  DragSelection: () => ReactElement<any, string | JSXElementConstructor<any>>;
};

export const useDragSelection = (): UseDragSelectionResult => {
  const { setSelectedBlocks, setPivotSelectedBlock } =
    useBlockSelectionUpdaterContext();
  const { selectedBlocks } = useBlockSelectionConsumerContext();
  const { isSelectionEnabled } = useBlockSelectionConsumerContext();
  const [selectableBoxes, setSelectableBoxes] = useState<Box[]>([]);

  const { blockRefs } = useRefsContext();

  const { DragSelection } = useSelectionContainer({
    eventsElement: null,
    // typeof document !== undefined
    //   ? document?.getElementById('post-editor')
    //   : null,

    onSelectionChange: (box) => {
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
      };
      const indexesToSelect: number[] = [];

      selectableBoxes.forEach((box, index) => {
        if (boxesIntersect(scrollAwareBox, box)) {
          indexesToSelect.push(index);
        }
      });

      const sel = document.getSelection();

      if (indexesToSelect.length < 2) {
        setPivotSelectedBlock(indexesToSelect[0]);
        setSelectedBlocks([]);
      } else {
        if (sel) sel.removeAllRanges();
        setSelectedBlocks(indexesToSelect);
      }
    },
    onSelectionStart: () => {
      const scrollY = window.scrollY;
      const selectableBoxes: Box[] = blockRefs.current.map((ref) => {
        const { top, left, width, height } = ref.getBoundingClientRect();
        return { top: top + scrollY, left, width, height };
      });

      setSelectableBoxes(selectableBoxes);
    },
    selectionProps: {
      style: {
        border: '',
        background:
          selectedBlocks.length > 1 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        borderRadius: 4,
        opacity: 0.6,
        zIndex: 1000,
      },
    },
    isEnabled: isSelectionEnabled,
  });

  return { DragSelection };
};
