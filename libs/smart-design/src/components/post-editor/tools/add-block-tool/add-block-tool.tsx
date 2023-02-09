import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Command } from 'cmdk';
import React, { FC } from 'react';

import { ColumnBlockProps } from '../../blocks/blocks.types';
import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context';
import {
  ToAddBlock,
  toAddChain,
} from '../../contexts/blocks-db-context/blocks-db-reducer/blocks-db-reducer.types';
import { useRefsContext } from '../../contexts/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlContext,
} from '../../contexts/tool-control-context/tool-control-context';
import { Block, BlockType } from '../../post-editor.types';
import { DropdownContent, DropdownTrigger, Separator } from '../tools.styles';

import { AddBlockItem } from './add-block-tool-item';
import {
  DropdownItemTypes,
  buildBlocksActionMapping,
  buildBlocksMapping,
  dropdownItems,
} from './add-block-tool.helper';

type AddBlockToolProps = {
  chainId: string;
  chainBlockIndex: number;
};

export const AddBlockTool: FC<AddBlockToolProps> = React.memo(
  ({ chainId, chainBlockIndex }) => {
    const dispatchBlocksDB = useBlocksDBUpdaterContext();
    const toolControl = useToolControlContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();
    const { setPrevCaretPosition } = useRefsContext();

    const addBlock = async (blockType: DropdownItemTypes) => {
      let toAddBlocks: ToAddBlock[] = [];
      let focusFieldId: string;

      if (blockType === 'two-column' || blockType === 'three-column') {
        const newBlocks = buildBlocksMapping[blockType](chainId) as Block[];
        toAddBlocks = newBlocks.map((block, index) => [
          block,
          block.chainId,
          index === 0 ? chainBlockIndex + 1 : 0,
        ]);

        focusFieldId = `${newBlocks[1].id}_0`;
      } else {
        const newBlock = buildBlocksMapping[blockType](chainId) as Block;
        toAddBlocks = [[newBlock, chainId, chainBlockIndex + 1]];
        focusFieldId = `${newBlock.id}_0`;
      }

      dispatchBlocksDB({
        type: 'ADD_BLOCKS',
        payload: {
          toAddBlocks,
          redoAction: {
            type: 'FOCUS_FIELD',
            payload: {
              fieldId: focusFieldId,
              position: 'end',
              setPrevCaretPosition,
            },
          },
        },
      });
      buildBlocksActionMapping[blockType](focusFieldId);
      toolControl.setIsAddBlockMenuOpened(false);
      setToolBlockIndex(-1);
    };

    return (
      <DropdownMenu.Root
        open={toolControl.isAddBlockMenuOpened}
        onOpenChange={toolControl.setIsAddBlockMenuOpened}
      >
        <DropdownTrigger>
          <PlusIcon height={18} width={18} />
        </DropdownTrigger>
        <DropdownMenu.Portal>
          <DropdownContent
            side="bottom"
            align="start"
            sideOffset={5}
            animate={{ scale: 1 }}
            initial={{ scale: 0.95 }}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <ScrollArea.Root>
              <Command>
                <div cmdk-input-wrapper="">
                  <MagnifyingGlassIcon
                    aria-hidden={!toolControl.isAddBlockMenuOpened}
                    width="20px"
                    height="20px"
                  />
                  <Command.Input placeholder="Filter blocks..." autoFocus />
                </div>
                <ScrollArea.Viewport
                  key={`addBlockTOolViewport${chainId}${chainBlockIndex}`}
                >
                  <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    {dropdownItems.map(({ groupName, items }) => (
                      <React.Fragment key={groupName}>
                        <Command.Group heading={groupName}>
                          {Object.entries(items).map(
                            ([key, { label, snippet }]) => (
                              <Command.Item
                                key={`${label}_${key}`}
                                value={key}
                                onSelect={(val) =>
                                  addBlock(val as DropdownItemTypes)
                                }
                              >
                                <AddBlockItem
                                  type={key as DropdownItemTypes}
                                  label={label}
                                  snippet={snippet}
                                />
                              </Command.Item>
                            )
                          )}
                        </Command.Group>
                        <Separator />
                      </React.Fragment>
                    ))}
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
  }
);
