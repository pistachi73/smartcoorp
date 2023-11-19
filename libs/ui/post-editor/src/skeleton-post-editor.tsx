import { SkeletonBlockChain } from './blocks/skeleton-block-chain';
import { BlocksDBProvider } from './contexts/blocks-context';
import { UtilProvider } from './contexts/util-context/util-context';
import { BlockChainContainer, PostEditorContainer } from './post-editor.styles';
import { Toolbar } from './tools/toolbar';

export const SkeletonPostEditor = () => {
  return (
    <UtilProvider debounceTime={300}>
      <BlocksDBProvider blocksDB={{} as any} dispatchBlocksDB={{} as any}>
        <PostEditorContainer id="post-editor">
          <Toolbar />
          <BlockChainContainer>
            <SkeletonBlockChain />
          </BlockChainContainer>
        </PostEditorContainer>
      </BlocksDBProvider>
    </UtilProvider>
  );
};
