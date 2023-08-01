import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Command } from 'cmdk';
import React, { NamedExoticComponent, useState } from 'react';
import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Caption } from '@smartcoorp/ui/caption';
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
import { DropdownContent, DropdownTrigger } from '../block-tools.styles';

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
};

const blockToolMapping: Record<
  Exclude<BlockType, 'columns'>,
  AvailableTools[]
> = {
  header: ['shared', 'header'],
  list: ['shared', 'list'],
  paragraph: ['shared'],
  image: ['shared'],
  link: ['shared'],
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
    <DropdownMenu.Root
      open={isModifyBlockMenuOpened}
      onOpenChange={(isOpen) => {
        setIsModifyBlockMenuOpened(isOpen);
        if (isOpen) {
          setSelectedBlocks([blockIndex]);
        } else {
          setSelectedBlocks([]);
          focusField([blockIndex, 0], 'end');
          setToolBlockIndex(-1);
        }
      }}
    >
      <Tooltip
        open={isTooltipOpen}
        onOpenChange={setIsTooltipOpen}
        trigger={
          <DropdownTrigger asChild>
            <DragHandleDots2Icon height={8} width={8} />
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

      <DropdownMenu.Portal>
        <DropdownContent
          side="bottom"
          align="start"
          sideOffset={15}
          animate={{ scale: 1 }}
          initial={{ scale: 0.95 }}
          onCloseAutoFocus={(e: Event) => e.preventDefault()}
        >
          <ScrollArea.Root>
            <Command
              label="Filter actions..."
              onKeyDown={(e) => {
                if (e.key !== 'Escape') e.stopPropagation();
                handleSharedToolsKeyDown(e);
              }}
            >
              <div cmdk-input-wrapper="">
                <MagnifyingGlassIcon
                  aria-hidden={!isModifyBlockMenuOpened}
                  width="20px"
                  height="20px"
                />
                <Command.Input placeholder="Filter actions..." autoFocus />
              </div>
              <ScrollArea.Viewport>
                <Command.List>
                  <Command.Empty>No results found</Command.Empty>
                  {blockToolMapping[blockType].map((tool) => {
                    const Tool = toolMapping[tool];
                    return (
                      <Tool
                        key={tool}
                        blockId={blockId}
                        blockIndex={blockIndex}
                      />
                    );
                  })}
                </Command.List>
              </ScrollArea.Viewport>
            </Command>

            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </DropdownContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
