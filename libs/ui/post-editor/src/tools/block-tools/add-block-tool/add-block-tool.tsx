import { PlusIcon } from '@radix-ui/react-icons';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Command, CommandGroup, CommandItem } from '@smartcoorp/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@smartcoorp/ui/dropdown-menu';
import { scale380, spaceXS } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-context';
import type { ToAddBlock } from '../../../contexts/blocks-context/blocks-reducer/blocks-reducer.types';
import { useRefsContext } from '../../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlConsumerContext,
  useToolControlUpdaterContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import { useUtilContext } from '../../../contexts/util-context';
import type { Block } from '../../../post-editor.types';
import { TooltipCaption } from '../../toolbar/toolbar.styles';
import { DropdownTrigger } from '../block-tools.styles';

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
    const { hasMaxImages } = useUtilContext();

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
      <DropdownMenu
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
          triggerAsChild
          trigger={
            <DropdownTrigger>
              <PlusIcon height={18} width={18} />
            </DropdownTrigger>
          }
          content={
            <TooltipContentContainer>
              <Body size="xsmall" noMargin>
                Add block
                <TooltipCaption noMargin as={'span'}>
                  &#8984; B
                </TooltipCaption>
              </Body>
            </TooltipContentContainer>
          }
        />
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={5}
          onCloseAutoFocus={(e: Event) => e.preventDefault()}
          style={{
            width: scale380,
          }}
        >
          <Command
            label="Filter actions..."
            size="small"
            onKeyDown={(e) => {
              if (e.key !== 'Escape') e.stopPropagation();
            }}
          >
            {dropdownItems.map(({ groupName, items }) => (
              <React.Fragment key={groupName}>
                <CommandGroup heading={groupName}>
                  {Object.entries(items).map(([key, { label, snippet }]) => {
                    const props: Record<string, any> = {};
                    if (key === 'image') {
                      props.disabled = hasMaxImages.hasMaxImages;
                    }

                    return (
                      <CommandItem
                        key={`${label}_${key}`}
                        value={label}
                        onSelect={(val) => addBlock(val as DropdownItemTypes)}
                        {...props}
                      >
                        <AddBlockItem
                          type={key as DropdownItemTypes}
                          label={label}
                          snippet={snippet}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </React.Fragment>
            ))}
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
