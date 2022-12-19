import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from '@air/react-drag-to-select';
import { JSXElementConstructor, ReactElement } from 'react';

import { useBlockSelection } from './use-block-selection';

type UseDragSelectionResult = {
  DragSelection: () => ReactElement<any, string | JSXElementConstructor<any>>;
};

export const useDragSelection = (): UseDragSelectionResult => {
  const {
    selectableBlocks,
    setSelectedBlocks,
    isSelectionEnabled,
    setCenterSelectedBlock,
  } = useBlockSelection();

  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById('root'),

    onSelectionChange: (box) => {
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
      };
      const indexesToSelect: number[] = [];
      selectableBlocks.current.forEach((block, index) => {
        if (boxesIntersect(scrollAwareBox, block)) {
          indexesToSelect.push(index);
        }
      });

      const sel = document.getSelection();

      if (indexesToSelect.length === 1)
        setCenterSelectedBlock(indexesToSelect[0]);
      if (indexesToSelect.length < 2) {
        setSelectedBlocks([]);
        setCenterSelectedBlock(indexesToSelect[0]);
      } else {
        if (sel) sel.removeAllRanges();
        setSelectedBlocks(indexesToSelect);
      }
    },

    selectionProps: {
      style: {
        border: '',
        borderRadius: 4,
        backgroundColor: 'transparent',
        opacity: 0.6,
        zIndex: 1000,
      },
    },
    isEnabled: isSelectionEnabled,
  });

  return { DragSelection };
};
