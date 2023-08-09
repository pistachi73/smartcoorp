import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import React, { NamedExoticComponent, useState } from 'react';
import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Caption } from '@smartcoorp/ui/caption';
import { Command } from '@smartcoorp/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@smartcoorp/ui/dropdown-menu';
import { spaceXS } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlConsumerContext,
  useToolControlUpdaterContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import type { BlockType } from '../../../post-editor.types';
import { DropdownTrigger } from '../block-tools.styles';

import { ColumnTools } from './column-tools/column-tools';
import { HeaderTools } from './header-tools/header-tools';
import { ListTools } from './list-tools/list-tools';
import {
  AvailableTools,
  ModifyBlockToolContainerProps,
  ModifyBlockToolProps,
} from './modify-block-tool.types';
import { SharedTools } from './shared-tools/shared-tools';
import { useSharedTools } from './shared-tools/use-shared-tools';

const toolMapping: Record<
  AvailableTools,
  NamedExoticComponent<ModifyBlockToolProps>
> = {
  shared: SharedTools,
  header: HeaderTools,
  list: ListTools,
  '2-columns': ColumnTools,
  '3-columns': ColumnTools,
};

const blockToolMapping: Record<
  Exclude<BlockType, 'columns'> | '2-columns' | '3-columns',
  AvailableTools[]
> = {
  header: ['shared', 'header'],
  list: ['shared', 'list'],
  paragraph: ['shared'],
  image: ['shared'],
  link: ['shared'],
  '2-columns': ['2-columns'],
  '3-columns': ['3-columns'],
};

const TooltipContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${spaceXS};
`;

export const ModifyBlockTool: React.FC<ModifyBlockToolContainerProps> = ({
  blockId,
  blockType,
  blockIndex,
}) => {
  const { isModifyBlockMenuOpened } = useToolControlConsumerContext();
  const { setIsModifyBlockMenuOpened } = useToolControlUpdaterContext();
  const { focusField } = useRefsContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { handleSharedToolsKeyDown } = useSharedTools({
    blockIndex,
    blockId,
  });
  const setToolBlockIndex = useToolBlockIndexUpdaterContext();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <DropdownMenu
      open={isModifyBlockMenuOpened}
      onOpenChange={(isOpen) => {
        setIsModifyBlockMenuOpened(isOpen);
        if (isOpen) {
          setSelectedBlocks([blockIndex]);
        } else {
          setSelectedBlocks([]);
          if (blockType !== '2-columns' && blockType !== '3-columns')
            focusField([blockIndex, 0], 'end');
          setToolBlockIndex(-1);
        }
      }}
    >
      <Tooltip
        open={isTooltipOpen}
        onOpenChange={setIsTooltipOpen}
        triggerAsChild
        trigger={
          <DropdownTrigger>
            <DragHandleDots2Icon height={16} width={16} />
          </DropdownTrigger>
        }
        content={
          <TooltipContentContainer>
            <Body size="xsmall" noMargin>
              Click to tune
            </Body>
            <Caption noMargin as={'span'}>
              ↹ Tab
            </Caption>
          </TooltipContentContainer>
        }
      />
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={5}
        onCloseAutoFocus={(e: Event) => e.preventDefault()}
      >
        <Command
          label="Filter actions..."
          size="small"
          onKeyDown={(e) => {
            if (e.key !== 'Escape') e.stopPropagation();
            handleSharedToolsKeyDown(e);
          }}
        >
          {blockToolMapping[blockType].map((tool) => {
            const Tool = toolMapping[tool];
            return (
              <Tool key={tool} blockId={blockId} blockIndex={blockIndex} />
            );
          })}
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
