import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Command } from 'cmdk';
import React, { NamedExoticComponent, ReactElement } from 'react';

import { useBlockSelectionUpdaterContext } from '../../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlContext,
} from '../../contexts/tool-control-context/tool-control-context';
import { Block, BlockType } from '../../post-editor.types';
import { DropdownContent, DropdownTrigger } from '../tools.styles';

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

export const ModifyBlockTool: React.FC<ModifyBlockToolContainerProps> = ({
  chainId,
  blockId,
  blockType,
  chainBlockIndex,
  blockIndex,
  chainLength,
}) => {
  const toolControl = useToolControlContext();
  const { focusField } = useRefsContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { handleSharedToolsKeyDown } = useSharedTools({
    blockIndex,
    blockId,
  });
  const setToolBlockIndex = useToolBlockIndexUpdaterContext();

  return (
    <DropdownMenu.Root
      open={toolControl.isModifyBlockMenuOpened}
      onOpenChange={(isOpen) => {
        toolControl.setIsModifyBlockMenuOpened(isOpen);
        if (isOpen) {
          setSelectedBlocks([blockIndex]);
        } else {
          setSelectedBlocks([]);
          focusField([blockIndex, 0], 'end');
          setToolBlockIndex(-1);
        }
      }}
    >
      <DropdownTrigger>
        <DragHandleDots2Icon height={18} width={18} />
      </DropdownTrigger>
      <DropdownMenu.Portal>
        <DropdownContent
          side="bottom"
          align="start"
          sideOffset={15}
          animate={{ scale: 1 }}
          initial={{ scale: 0.95 }}
          onCloseAutoFocus={(e) => e.preventDefault()}
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
                  aria-hidden={!toolControl.isAddBlockMenuOpened}
                  width="20px"
                  height="20px"
                />
                <Command.Input placeholder="Filter actions..." autoFocus />
              </div>
              <ScrollArea.Viewport>
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>
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
