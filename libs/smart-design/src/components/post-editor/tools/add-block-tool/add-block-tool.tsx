import { FC, useEffect, useState } from 'react';
import * as React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineAdd } from 'react-icons/md';

import { FormField } from '../../../form-field';
import { useAvailableBlocks, useBlockUpdaterContext } from '../../contexts/block-context';
import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockType } from '../../post-editor.types';
import { Menu } from '../tools.styles';

import { availableBlocksButtonContent, insertableBlocks } from './add-block-tool.helper';
import * as S from './add-block-tool.styles';

type AddBlockToolProps = {
  blockIndex: number;
};

export const AddBlockTool: FC<AddBlockToolProps> = React.memo(({ blockIndex }) => {
  const { setBlocks } = useBlockUpdaterContext();
  const { availableBlocks } = useAvailableBlocks();
  const setTool = useUpdateTool();
  const {
    addBlockMenuProps: { refs: menuRefs, ...menuProps },
  } = useBlockMenu();

  const [filteredBlocks, setFilteredBlocks] = useState<BlockType[]>(availableBlocks);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredBlocks: BlockType[] = availableBlocks.filter((block) =>
      block.includes(e.target.value)
    );

    menuRefs.current = [];
    await setFilterValue(e.target.value);
    await setFilteredBlocks(filteredBlocks);
  };

  useEffect(() => {
    menuRefs.current = menuRefs.current.filter((ref: HTMLElement | null) => ref !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuRefs.current]);

  const addBlock = async (blockType: BlockType) => {
    const { block, action } = insertableBlocks[blockType]();

    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks.splice(blockIndex + 1, 0, block);
      return newBlocks;
    });

    menuProps.closeMenu();

    action && (await action());

    setTool(null);
  };

  return (
    <Menu
      triggerProps={{
        size: 'small',
        icon: MdOutlineAdd,
        variant: 'text',
        iconSize: 22,
      }}
      aria-label="Add block tool"
      {...menuProps}
      refs={menuRefs}
    >
      <FormField
        size="small"
        id="fo"
        value={filterValue}
        onChange={handleFilterChange}
        ref={(el: HTMLElement) => (menuRefs.current[0] = el)}
        icon={BiSearch}
      />
      <S.MenuItemContainer>
        {filteredBlocks.length ? (
          filteredBlocks.map((block, index) => (
            <S.MenuItem
              key={block}
              ref={(el: HTMLElement) => (menuRefs.current[index + 1] = el)}
              onClick={() => addBlock(block)}
            >
              <S.MenuItemIconContainer>
                {availableBlocksButtonContent[block].icon}
              </S.MenuItemIconContainer>
              {availableBlocksButtonContent[block].label}
            </S.MenuItem>
          ))
        ) : (
          <S.MenuItem $notFound={true}>Not found</S.MenuItem>
        )}
      </S.MenuItemContainer>
    </Menu>
  );
});
