import { BlockType } from '../post-editor.types';
export const getBlockContainerAttributes = (ref: HTMLDivElement) => {
  const chainId = ref?.getAttribute('data-chain-id') as string;
  const blockId = ref?.getAttribute('data-block-id') as string;
  const parentChainId = ref?.getAttribute('data-parent-chain-id') as string;
  const chainBlockIndex = Number(ref?.getAttribute('data-chain-block-index'));
  const chainLength = Number(ref?.getAttribute('data-chain-length'));
  const blockIndex = Number(ref?.getAttribute('data-block-index'));
  const chainLevel = Number(ref?.getAttribute('data-chain-level'));
  const blockType = ref?.getAttribute('data-block-type') as BlockType;

  return {
    chainId,
    parentChainId,
    chainLevel,
    blockId,
    blockIndex,
    chainBlockIndex,
    blockType,
    chainLength,
  };
};
