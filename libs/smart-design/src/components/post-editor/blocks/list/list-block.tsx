import { FC, useRef } from 'react';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockContainer } from '../../post-editor.styles';
import { ListBlockProps } from '../../post-editor.types';

import { ListBlockContent } from './list-block-content';

export const ListBlock: FC<{
  blockIndex: number;
  block: ListBlockProps;
}> = ({ blockIndex, block }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: 'list',
      });
  };
  return (
    <BlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <ListBlockContent
        blockIndex={blockIndex}
        block={block}
        style={block.data.style}
      />
    </BlockContainer>
  );
};
