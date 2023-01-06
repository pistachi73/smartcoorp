import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { ListField } from '../../fields/list-field';
import { getCaretPosition } from '../../helpers';
import { getElementTextContent } from '../../helpers/get-element-textcontent';
import { waitForElement } from '../../helpers/wait-for-element';
import { usePreviousPersistentWithMatcher, useRefs } from '../../hooks';
import { useBlockEdit } from '../../hooks/use-block-edit';
import { useDispatchAsyncCommand } from '../../hooks/use-commands/use-dispatch-async-commands';
import { Block, ListBlockProps } from '../../post-editor.types';

type ListBlockContentProps = {
  blockIndex: number;
  block: ListBlockProps;
};

export const ListBlockContent: React.FC<ListBlockContentProps> = ({ blockIndex, block }) => {
  const { refs, focusableRefs } = useRefs();
  const setTool = useUpdateTool();
  const { setBlocks, updateBlockFields } = useBlockUpdaterContext();
  const { removeBlockAndFocusPrevious } = useBlockEdit(blockIndex);

  const prevItems = usePreviousPersistentWithMatcher(block.data.items);
  const { dispatchAsyncCommand } = useDispatchAsyncCommand(block.data.items, prevItems);
  const focusIndex = 0;
  const onItemsChange = useCallback(
    (items: string[]) => {
      updateBlockFields(blockIndex, {
        items,
      });

      dispatchAsyncCommand({
        type: 'editListField',
        field: 'items',
        blockIndex,
        fieldId: `${block.id}_${focusIndex}`,
        ref: focusableRefs.current[blockIndex][0],
      });
    },
    [updateBlockFields, blockIndex, dispatchAsyncCommand, block.id, focusableRefs]
  );

  const debouncedOnItemsChange = useMemo(() => {
    return debounce(onItemsChange, 300);
  }, [onItemsChange]);

  const onInputChange = async (e: React.ChangeEvent) => {
    await debouncedOnItemsChange(
      [].slice.call(e.currentTarget.children).map((node: Element) => node.innerHTML.trim())
    );
  };

  const handleItemKeyPress = async (e: React.KeyboardEvent) => {
    const element = refs.current[blockIndex];
    const caretPosition = getCaretPosition(element);
    const textContent = getElementTextContent(element);
    if (e.key === 'Enter') {
      const items = block.data.items;

      // Remove last item if empty and create paragraph block
      if (caretPosition === textContent.length && items[items.length - 1] === '<br>') {
        e.preventDefault();
        console.log('remove last item if empty and create paragraph block');
        const newBlockId = uuid();
        await setBlocks((prevBlocks: Block[]): Block[] => {
          const newBlocks = [...prevBlocks];

          const newBlock: Block = {
            id: newBlockId,
            type: 'paragraph',
            data: {
              text: '',
            },
          };

          newBlocks.splice(blockIndex + 1, 0, newBlock);
          items.pop();
          (newBlocks[blockIndex] as ListBlockProps).data.items = items;

          return newBlocks;
        });

        document.execCommand('delete');
        (await waitForElement(newBlockId))?.focus();
        setTool(null);
      }
    }

    if (e.key === 'Backspace') {
      if (caretPosition === 0 && textContent.length === 0) {
        e.preventDefault();
        await removeBlockAndFocusPrevious();
        return;
      }
    }
  };

  return (
    <ListField
      blockId={block.id}
      blockIndex={blockIndex}
      field="items"
      focusIndex={focusIndex}
      items={block.data.items}
      style={block.data.style}
      onInputChange={onInputChange}
      data-block-type="list"

      // onKeyDown={handleItemKeyPress}
    />
  );
};
