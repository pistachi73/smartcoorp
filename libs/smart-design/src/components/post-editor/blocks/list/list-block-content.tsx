import { memo, useEffect, useMemo, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { v4 as uuid } from 'uuid';

import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { getCaretPosition } from '../../helpers';
import { getElementTextContent } from '../../helpers/get-element-textcontent';
import { waitForElement } from '../../helpers/wait-for-element';
import { useBlockEdit } from '../../hooks/use-block-edit';
import { useBlockNavigation } from '../../hooks/use-block-navigation';
import { BlockContent } from '../../post-editor.styles';
import { Block, ListBlockProps } from '../../post-editor.types';

import * as S from './list-block.styles';

type ListBlockContentProps = {
  blockIndex: number;
  block: ListBlockProps;
  style: 'ordered' | 'unordered';
};

export const ListBlockContent = memo<ListBlockContentProps>(
  ({ blockIndex, block, style }) => {
    const [initialItems, setInitialItems] = useState(block.data.items);
    const { refs } = useRefs();
    const setTool = useUpdateTool();
    const { setBlocks } = useUpdateBlocks();
    const { handleBlockNavigation } = useBlockNavigation(blockIndex);
    const { removeBlockAndFocusPrevious } = useBlockEdit(blockIndex);

    useEffect(() => {
      setInitialItems(block.data.items);
    }, [style, block]);

    const initialRender = useMemo(
      () =>
        initialItems.map((item) => (
          <S.ListItem dangerouslySetInnerHTML={{ __html: `${item}` }} />
        )),
      [initialItems]
    );

    const updateBlock = async (items: string[]) =>
      await setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        (newBlocks[blockIndex] as ListBlockProps).data.items = items;
        return newBlocks;
      });

    const onBlockChange = async () => {
      const element = refs.current[blockIndex];

      const newItems: string[] = [];
      element.childNodes.forEach((node: Element) =>
        newItems.push(node.innerHTML.trim())
      );

      await updateBlock(newItems);
    };

    const handleItemKeyPress = async (e: React.KeyboardEvent) => {
      const element = refs.current[blockIndex];
      const caretPosition = getCaretPosition(element);
      const textContent = getElementTextContent(element);
      if (e.key === 'Enter') {
        const items = block.data.items;

        // Remove last item if empty and create paragraph block
        if (
          caretPosition === textContent.length &&
          items[items.length - 1] === '<br>'
        ) {
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

      handleBlockNavigation(e);
    };

    const listProps = {
      id: block.id,
      ref: (el: any) => (refs.current[blockIndex] = el),
      contentEditable: true,
      suppressContentEditableWarning: true,
      onInput: onBlockChange,
      onKeyDown: handleItemKeyPress,
      dangerouslySetInnerHTML: {
        __html: `${initialRender
          .map((item) => ReactDOMServer.renderToStaticMarkup(item))
          .join('')}`,
      },
    };
    return (
      <BlockContent>
        {block.data.style === 'ordered' ? (
          <S.OrderedList {...listProps} />
        ) : (
          <S.UnorderedList {...listProps} />
        )}
      </BlockContent>
    );
  }
);
