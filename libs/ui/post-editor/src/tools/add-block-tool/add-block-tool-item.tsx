import React from 'react';

import {
  IconContainer,
  ItemContainer,
  Label,
  Snippet,
} from './add-block-tool-item.styles';
import { DropdownItemTypes } from './add-block-tool.helper';
import { ColumnsIcon } from './icons/columns-icon';
import { HeaderIcon } from './icons/header-icon';
import { ImageIcon } from './icons/image-icon';
import { LinkIcon } from './icons/link-icon';
import { ListIcon } from './icons/list-icon';
import { ParagraphIcon } from './icons/paragraph-icon';

type AddBlockItemProps = {
  label: string;
  type: DropdownItemTypes;
  snippet?: string;
};

const IconMapping: Record<DropdownItemTypes, any> = {
  header: <HeaderIcon width={24} />,
  paragraph: <ParagraphIcon width={28} />,
  list: <ListIcon width={24} />,
  link: <LinkIcon width={20} />,
  image: <ImageIcon width={20} />,
  'two-column': <ColumnsIcon width={30} />,
  'three-column': <ColumnsIcon width={30} />,
};

export const AddBlockItem: React.FC<AddBlockItemProps> = ({
  type,
  label,
  snippet,
}) => {
  return (
    <ItemContainer>
      <IconContainer>{IconMapping[type]}</IconContainer>
      <div>
        <Label>{label}</Label>
        <Snippet>{snippet}</Snippet>
      </div>
    </ItemContainer>
  );
};
