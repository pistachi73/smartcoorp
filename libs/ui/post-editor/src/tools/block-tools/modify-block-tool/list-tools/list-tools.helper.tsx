import React from 'react';

import type { ListBlockProps } from '../../../../post-editor.types';
import type { ModifyBlockTool } from '../modify-block-tool.types';

import { OrderedIcon, UnorderedIcon } from './icons';

export type HeaderModifyBlockTools = ListBlockProps['data']['style'];

export const listModifyBlockToolsMap: Record<
  ListBlockProps['data']['style'],
  ModifyBlockTool
> = {
  ordered: {
    label: 'Ordered',
    icon: <OrderedIcon width={13} />,
  },
  unordered: {
    label: 'Unordered',
    icon: <UnorderedIcon width={13} />,
  },
};
