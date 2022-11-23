import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { spaceS, spaceXXS } from '../../../tokens/spacing';
import { useMenu } from '../../menu';
import { useRefs } from '../contexts/refs-context';
import { useTool } from '../contexts/tool-context';

import { AddBlockTool } from './add-block-tool/add-block-tool';
import { ModifyBlockTools } from './modify-block-tools/modify-block-tools';

const ToolContainerWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: ${spaceXXS};
  padding: ${spaceS} 0;
  left: -10px;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
`;

export const ToolContainer = () => {
  const tool = useTool();
  const { refs } = useRefs();

  return (
    <ToolContainerWrapper
      style={{ top: tool ? refs.current[tool?.blockIndex].offsetTop : -200 }}
    >
      <AddBlockTool blockIndex={tool?.blockIndex || 0} />
      <ModifyBlockTools
        blockIndex={tool?.blockIndex || 0}
        blockType={tool?.type}
      />
    </ToolContainerWrapper>
  );
};
