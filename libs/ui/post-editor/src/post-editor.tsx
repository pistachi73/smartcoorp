import { FC } from 'react';

import { Blocks } from './blocks/blocks';
import { BlockSelectionProvider } from './contexts/block-selection-context/block-selection-context';
import { BlocksDBProvider } from './contexts/blocks-context/blocks-context';
import { RefsProvider } from './contexts/refs-context/refs-context';
import { ToolControlProvider } from './contexts/tool-control-context/tool-control-context';
import { BlockType, PostEditorProps } from './post-editor.types';

export type ToolProps = {
  blockIndex: number;
  top: number;
  type: BlockType;
};

export const PostEditor: FC<PostEditorProps> = ({
  blocksDB,
  setBlocksDB,
  getMetaData,
}) => {
  return (
    <BlocksDBProvider blocksDB={blocksDB} setBlocksDB={setBlocksDB}>
      <RefsProvider>
        <BlockSelectionProvider>
          <ToolControlProvider>
            {/* <InlineTools postEditorRef={postEditorContainerRef} /> */}

            <Blocks getMetaData={getMetaData} />
          </ToolControlProvider>
        </BlockSelectionProvider>
      </RefsProvider>
    </BlocksDBProvider>
  );
};
