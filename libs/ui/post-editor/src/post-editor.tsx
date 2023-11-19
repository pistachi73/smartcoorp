import { FC } from 'react';

import { Blocks } from './blocks/blocks';
import { BlockSelectionProvider } from './contexts/block-selection-context/block-selection-context';
import { BlocksDBProvider } from './contexts/blocks-context/blocks-context';
import { RefsProvider } from './contexts/refs-context/refs-context';
import { ToolControlProvider } from './contexts/tool-control-context/tool-control-context';
import { UtilProvider } from './contexts/util-context/util-context';
import { BlockType, PostEditorProps } from './post-editor.types';

export type ToolProps = {
  blockIndex: number;
  top: number;
  type: BlockType;
};

export const PostEditor: FC<PostEditorProps> = ({
  blocksDB,
  dispatchBlocksDB,
  getMetaData,
  debounceTime = 300,
  maxImages,
  toolbarTopOffset,
}) => {
  return (
    <UtilProvider debounceTime={debounceTime} maxImages={maxImages}>
      <RefsProvider>
        <BlockSelectionProvider>
          <ToolControlProvider>
            <BlocksDBProvider
              blocksDB={blocksDB}
              dispatchBlocksDB={dispatchBlocksDB}
            >
              <Blocks
                getMetaData={getMetaData}
                toolbarTopOffset={toolbarTopOffset}
              />
            </BlocksDBProvider>
          </ToolControlProvider>
        </BlockSelectionProvider>
      </RefsProvider>
    </UtilProvider>
  );
};
