import { FC, useRef } from 'react';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockContainer } from '../../post-editor.styles';
import { LinkBlockProps } from '../../post-editor.types';

import { LinkBlockContent } from './link-block-content';

export const LinkBlock: FC<{
  blockIndex: number;
  block: LinkBlockProps;
  getMetaData: any;
}> = ({ blockIndex, block, getMetaData }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: 'link',
      });
  };

  return (
    <BlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <LinkBlockContent
        blockIndex={blockIndex}
        block={block}
        getMetaData={getMetaData}
      />
    </BlockContainer>
  );
};
