import { AnimatePresence, Transition } from 'framer-motion';
import { useMemo } from 'react';

import { useRefsContext } from '../contexts/refs-context';
import { useToolBlockIndexConsumerContext } from '../contexts/tool-control-context/tool-control-context';
import { getBlockContainerAttributes } from '../helpers/get-block-container-attributes';
import { BlockType } from '../post-editor.types';

import { AddBlockTool } from './add-block-tool/add-block-tool';
import { ModifyBlockTool } from './modify-block-tool/modify-block-tool';
import { ToolsContainer } from './tools.styles';

export const Tools = () => {
  const toolBlockIndex = useToolBlockIndexConsumerContext();
  const { blockRefs } = useRefsContext();

  const isValidToolBlockIndex =
    toolBlockIndex !== null && toolBlockIndex !== -1;

  const blockProps = useMemo<
    ReturnType<typeof getBlockContainerAttributes> | undefined
  >(() => {
    if (!isValidToolBlockIndex) return undefined;
    return getBlockContainerAttributes(blockRefs.current[toolBlockIndex]);
  }, [blockRefs, isValidToolBlockIndex, toolBlockIndex]);

  if (!blockProps || !isValidToolBlockIndex) return null;

  const transition: Transition = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  };

  return (
    <AnimatePresence key={toolBlockIndex}>
      <ToolsContainer
        style={{
          top: blockRefs.current[toolBlockIndex].offsetTop + 8,
          left: blockRefs.current[toolBlockIndex].offsetLeft,
        }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={transition}
      >
        <AddBlockTool
          chainId={blockProps.chainId}
          chainBlockIndex={blockProps.chainBlockIndex}
        />
        <ModifyBlockTool
          chainId={blockProps.chainId}
          blockId={blockProps.blockId}
          blockType={blockProps.blockType as Exclude<BlockType, 'columns'>}
          chainBlockIndex={blockProps.chainBlockIndex}
          blockIndex={toolBlockIndex}
          chainLength={blockProps.chainLength}
        />
      </ToolsContainer>
    </AnimatePresence>
  );
};
