import { BlockRefs } from '../../contexts/refs-context';
import { getBlockContainerAttributes } from '../../helpers';

export const getToRemoveBlocksFromSelection = (
  selectedBlocks: number[],
  blockRefs: BlockRefs
): [string, string][] =>
  selectedBlocks.map((index) => {
    const blockRef = blockRefs[index];
    const { chainId, blockId } = getBlockContainerAttributes(blockRef);
    return [blockId, chainId];
  });
