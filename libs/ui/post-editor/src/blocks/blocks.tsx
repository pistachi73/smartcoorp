import { useDragSelection, useSharedEvents } from '../hooks';
import { PostEditorContainer } from '../post-editor.styles';
import { Tools } from '../tools/tools';

import { BlockChain } from './block-chain';

export const Blocks = ({ getMetaData }: { getMetaData: any }) => {
  const { DragSelection } = useDragSelection();
  const { handleSharedClickDown, handleSharedKeyDown } = useSharedEvents();

  return (
    <PostEditorContainer
      id="post-editor"
      onMouseDown={handleSharedClickDown}
      onKeyDown={handleSharedKeyDown}
    >
      <Tools />

      <BlockChain chainId="main" getMetaData={getMetaData} />

      <DragSelection />
    </PostEditorContainer>
  );
};
