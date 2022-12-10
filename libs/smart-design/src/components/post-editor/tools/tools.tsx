import { useRefs } from '../contexts/refs-context';
import { useTool } from '../contexts/tool-context';

import { AddBlockTool } from './add-block-tool/add-block-tool';
import { ModifyBlockTools } from './modify-block-tools/modify-block-tools';
import { ToolsContainer } from './tools.styles';

export const Tools = () => {
  const tool = useTool();
  const { refs } = useRefs();

  return (
    <ToolsContainer
      style={{ top: tool ? refs.current[tool?.blockIndex].offsetTop : -200 }}
    >
      <AddBlockTool blockIndex={tool?.blockIndex || 0} />
      <ModifyBlockTools
        blockIndex={tool?.blockIndex || 0}
        blockType={tool?.type}
      />
    </ToolsContainer>
  );
};
