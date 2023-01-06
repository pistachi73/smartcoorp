import { useTool } from '../contexts/tool-context';
import { useRefs } from '../hooks';

import { AddBlockTool } from './add-block-tool/add-block-tool';
import { ModifyBlockTools } from './modify-block-tools/modify-block-tools';
import { ToolsContainer } from './tools.styles';

export const Tools = () => {
  const tool = useTool();
  const { blockRefs } = useRefs();

  return (
    <ToolsContainer
      style={{
        top: tool ? blockRefs.current[tool?.blockIndex].offsetTop : -200,
      }}
    >
      <AddBlockTool blockIndex={tool?.blockIndex || 0} />
      <ModifyBlockTools
        blockIndex={tool?.blockIndex || 0}
        blockType={tool?.type}
      />
    </ToolsContainer>
  );
};
