import { useDragSelection, useSharedEvents } from '../hooks';
import { PostEditorContainer } from '../post-editor.styles';

import { BlockChain } from './block-chain';

export const Blocks = ({ getMetaData }: { getMetaData: any }) => {
  const { DragSelection } = useDragSelection();
  const { handleSharedClickDown, handleSharedKeyDown } = useSharedEvents();

  return (
    <PostEditorContainer
      onMouseDown={handleSharedClickDown}
      onKeyDown={handleSharedKeyDown}
    >
      <BlockChain chainId="main" />
      <DragSelection />
    </PostEditorContainer>
  );
};
