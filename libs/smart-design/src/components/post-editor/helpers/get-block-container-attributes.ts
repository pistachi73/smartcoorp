export const getBlockContainerAttributes = (ref: HTMLDivElement) => {
  const chainId = ref.getAttribute('data-chain-id') as string;
  const blockId = ref.getAttribute('data-block-id') as string;
  const chainBlockIndex = Number(ref.getAttribute('data-chain-block-index'));
  const blockIndex = Number(ref.getAttribute('data-block-index'));

  return {
    chainId,
    blockId,
    blockIndex,
    chainBlockIndex,
  };
};
