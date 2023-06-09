import { useEffect } from 'react';

import { useDragSelection, useSharedEvents } from '../hooks';
import { PostEditorContainer } from '../post-editor.styles';
import { Tools } from '../tools/tools';

import { BlockChain } from './block-chain';

const pasteEvent = (e: any) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
};
export const Blocks = ({ getMetaData }: { getMetaData: any }) => {
  const { DragSelection } = useDragSelection();
  const { handleSharedClickDown, handleSharedKeyDown } = useSharedEvents();

  useEffect(() => {
    document.addEventListener('paste', pasteEvent);

    return () => {
      document.removeEventListener('paste', pasteEvent);
    };
  }, []);

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
