import { FC } from 'react';

import { Blocks } from './blocks/blocks';
import { BlockMenuToolProvider } from './contexts/block-menu-tool-context';
import { BlockSelectionProvider } from './contexts/block-selection-context/block-selection-context';
import { BlocksDBProvider } from './contexts/blocks-db-context/blocks-db-context';
import { RefsProvider } from './contexts/refs-context/refs-context';
import { ToolProvider } from './contexts/tool-context';
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
  if (!blocksDB) return null;

  return (
    <BlocksDBProvider blocksDB={blocksDB} setBlocksDB={setBlocksDB}>
      <RefsProvider>
        <BlockSelectionProvider>
          <BlockMenuToolProvider>
            <ToolProvider>
              {/* <Tools />
                      <InlineTools postEditorRef={postEditorContainerRef} /> */}

              <Blocks getMetaData={getMetaData} />
            </ToolProvider>
          </BlockMenuToolProvider>
        </BlockSelectionProvider>
      </RefsProvider>
    </BlocksDBProvider>
  );
};
