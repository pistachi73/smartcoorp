import { FC, useRef } from 'react';

import { Blocks } from './blocks/blocks';
import { BlockProvider } from './contexts/block-context';
import { BlockMenuToolProvider } from './contexts/block-menu-tool-context';
import { RefsProvider } from './contexts/refs-context';
import { ToolProvider } from './contexts/tool-context';
import { PostEditorContainer } from './post-editor.styles';
import { BlockType, PostEditorProps } from './post-editor.types';
import { InlineTools } from './tools/inline-tools/inline-tools';
import { Tools } from './tools/tools';

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
  const postEditorContainerRef = useRef<HTMLDivElement>(null);
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
            <PostEditorContainer ref={postEditorContainerRef}>
              <Tools />
              <InlineTools postEditorRef={postEditorContainerRef} />
              <Blocks getMetaData={getMetaData} />
            </PostEditorContainer>
          </BlockProvider>
        </RefsProvider>
      </ToolProvider>
    </BlockMenuToolProvider>
  );
};
