import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Command } from 'cmdk';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { spaceXS } from '@smartcoorp/smart-design/tokens';

import { Caption } from '../../../caption';
import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import type { ToAddBlock } from '../../contexts/blocks-context/blocks-reducer/blocks-reducer.types';
import { useRefsContext } from '../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlConsumerContext,
  useToolControlUpdaterContext,
} from '../../contexts/tool-control-context/tool-control-context';
import type { Block } from '../../post-editor.types';
import { DropdownContent, DropdownTrigger, Separator } from '../tools.styles';

import { Body } from './../../../body';
import { Tooltip } from './../../../tooltip';
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
  blockIndex: number;
};

const TooltipContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${spaceXS};
`;

export const AddBlockTool: FC<AddBlockToolProps> = React.memo(
  ({ chainId, chainBlockIndex, blockIndex }) => {
    const { addBlocks, buildFocusFieldAction } = useBlocksDBUpdaterContext();
    const { focusField } = useRefsContext();
    const { setIsAddBlockMenuOpened } = useToolControlUpdaterContext();
    const { isAddBlockMenuOpened } = useToolControlConsumerContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const addBlock = async (blockType: DropdownItemTypes) => {
      let toAddBlocks: ToAddBlock[] = [];
      let focusFieldId: string;

      if (blockType === 'two-column' || blockType === 'three-column') {
        const newBlocks = buildBlocksMapping[blockType](chainId) as Block[];
        toAddBlocks = newBlocks.map((block, index) => [
          block,
          block.chainId,
          index === 0 ? chainBlockIndex + 1 : 0, //first block is the one containing the columns
        ]);

        focusFieldId = `${newBlocks[1].id}_0`;
      } else {
        const newBlock = buildBlocksMapping[blockType](chainId) as Block;
        toAddBlocks = [[newBlock, chainId, chainBlockIndex + 1]];
        focusFieldId = `${newBlock.id}_0`;
      }

      addBlocks({
        toAddBlocks,
        //TODO;  NO UNDO?
        redo: buildFocusFieldAction({
          fieldId: focusFieldId,
          position: 'end',
        }),
      });

      buildBlocksActionMapping[blockType](focusFieldId);
      setIsAddBlockMenuOpened(false);
      setToolBlockIndex(-1);
    };

    return (
      <DropdownMenu.Root
        open={isAddBlockMenuOpened}
        onOpenChange={(isOpen) => {
          setIsAddBlockMenuOpened(isOpen);
          if (!isOpen) {
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
              <PlusIcon height={16} width={16} />
            </DropdownTrigger>
          }
          content={
            <TooltipContentContainer>
              <Body size="xsmall" noMargin>
                Add block
              </Body>
              <Caption noMargin as={'span'}>
                &#8984; I
              </Caption>
            </TooltipContentContainer>
          }
        />

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
                    aria-hidden={!isAddBlockMenuOpened}
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
            </ScrollArea.Root>
          </DropdownContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);
