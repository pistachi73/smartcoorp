import { AnimatePresence, Transition } from 'framer-motion';
import { useMemo } from 'react';

import { useRefsContext } from '../../contexts/refs-context';
import { useToolBlockIndexConsumerContext } from '../../contexts/tool-control-context/tool-control-context';
import { getBlockContainerAttributes } from '../../helpers/get-block-container-attributes';

import { AddBlockTool } from './add-block-tool/add-block-tool';
import { ToolsContainer } from './block-tools.styles';
import { ModifyBlockTool } from './modify-block-tool/modify-block-tool';

export const BlockTools = () => {
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

  if (
    !blockProps ||
    !isValidToolBlockIndex ||
    !blockRefs.current[toolBlockIndex] ||
    blockProps.blockType === 'columns'
  )
    return null;

  const transition: Transition = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  };

  const top = blockRefs.current[toolBlockIndex].offsetTop;
  const left = blockRefs.current[toolBlockIndex].offsetLeft;
  const bottom = blockRefs.current[toolBlockIndex].offsetHeight;

  return (
    <AnimatePresence key={toolBlockIndex}>
      <ToolsContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={transition}
        $top={top}
        $left={left}
        $height={bottom}
      >
        <AddBlockTool
          chainId={blockProps.chainId}
          chainBlockIndex={blockProps.chainBlockIndex}
          blockIndex={toolBlockIndex}
        />
        <ModifyBlockTool
          blockId={blockProps.blockId}
          blockType={blockProps.blockType}
          blockIndex={toolBlockIndex}
        />
      </ToolsContainer>
    </AnimatePresence>
  );
};
