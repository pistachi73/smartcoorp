import React, { useEffect } from 'react';
import { GrConfigure } from 'react-icons/gr';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { BlockType } from '../../post-editor.types';
import { Menu } from '../tools.styles';

import { CommonTools } from './common-tools';
import { HeaderTools } from './header-tools';
import { ListTools } from './list-tools';

type ModifyBlockToolsProps = {
  blockIndex: number;
  blockType?: BlockType;
};

const TOOL_BUTTONS = {
  header: 6,
  image: 0,
  paragraph: 0,
  list: 2,
  link: 3,
  default: 0,
};

export const ModifyBlockTools: React.FC<ModifyBlockToolsProps> = ({
  blockIndex,
  blockType,
}) => {
  const {
    modifyBlockMenuProps: { refs: menuRefs, ...menuProps },
  } = useBlockMenu();

  useEffect(() => {
    if (!menuProps.isOpen) menuRefs.current = [];
  }, [blockIndex, menuRefs, menuProps.isOpen]);

  return (
    <Menu
      triggerProps={{
        size: 'small',
        icon: GrConfigure,
        variant: 'text',
        iconSize: 18,
      }}
      aria-label="Add block tool"
      {...menuProps}
      refs={menuRefs}
    >
      {blockType === 'header' && (
        <HeaderTools blockIndex={blockIndex} menuRefs={menuRefs} />
      )}
      {blockType === 'list' && (
        <ListTools blockIndex={blockIndex} menuRefs={menuRefs} />
      )}

      <CommonTools
        blockIndex={blockIndex}
        menuRefs={menuRefs}
        startingIndex={TOOL_BUTTONS[blockType || 'default']}
      />
    </Menu>
  );
};
