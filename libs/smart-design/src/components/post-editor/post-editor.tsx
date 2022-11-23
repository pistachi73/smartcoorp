import { FC } from 'react';

import { Blocks } from './blocks/blocks';
import { BlockProvider } from './contexts/block-context';
import { BlockMenuToolProvider } from './contexts/block-menu-tool-context';
import { RefsProvider } from './contexts/refs-context';
import { ToolProvider } from './contexts/tool-context';
import { PostEditorContainer } from './post-editor.styles';
import { BlockType, PostEditorProps } from './post-editor.types';
import { ToolContainer } from './tools/tool-container';

export type ToolProps = {
  blockIndex: number;
  top: number;
  type: BlockType;
};

export const PostEditor: FC<PostEditorProps> = ({
  blocks,
  setBlocks,
  getMetaData,
}) => {
  if (!blocks) return null;

  return (
    <BlockMenuToolProvider>
      <ToolProvider>
        <RefsProvider>
          <BlockProvider
            blocks={blocks}
            setBlocks={setBlocks}
            getMetaData={getMetaData}
          >
            <PostEditorContainer>
              <ToolContainer />
              <Blocks getMetaData={getMetaData} />
            </PostEditorContainer>
          </BlockProvider>
        </RefsProvider>
      </ToolProvider>
    </BlockMenuToolProvider>
  );
};
