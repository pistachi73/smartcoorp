import { FC, useRef } from 'react';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockContainer } from '../../post-editor.styles';
import { ImageBlockProps } from '../../post-editor.types';

import { ImageBlockContent } from './image-block-content';

export const ImageBlock: FC<{
  blockIndex: number;
  block: ImageBlockProps;
}> = ({ blockIndex, block }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: 'image',
      });
  };

  return (
    <BlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <ImageBlockContent blockIndex={blockIndex} block={block} />
    </BlockContainer>
  );
};
