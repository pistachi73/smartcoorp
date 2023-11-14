import { useEffect } from 'react';

import { useDragSelection, useSharedEvents } from '../hooks';
import {
  BlockChainContainer,
  PostEditorContainer,
} from '../post-editor.styles';
import { BlockTools } from '../tools/block-tools';
import { Toolbar } from '../tools/toolbar';

import { BlockChain } from './block-chain';

const pasteEvent = (e: any) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
};

export const Blocks = ({
  getMetaData,
  toolbarTopOffset,
}: {
  getMetaData: any;
  toolbarTopOffset?: number;
}) => {
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
      <DragSelection />
      <BlockTools />
      <Toolbar toolbarTopOffset={toolbarTopOffset} />
      <BlockChainContainer>
        <BlockChain chainId="main" getMetaData={getMetaData} />
      </BlockChainContainer>
    </PostEditorContainer>
  );
};
