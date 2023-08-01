import React from 'react';

import { HeaderBlockProps } from '../../../../post-editor.types';
import { ModifyBlockTool } from '../modify-block-tool.types';

import { H1Icon, H2Icon, H3Icon, H4Icon, H5Icon, H6Icon } from './icons';

export const headerModifyBlockToolsMap: Record<
  HeaderBlockProps['data']['level'],
  ModifyBlockTool
> = {
  1: {
    label: 'Header 1',
    icon: <H1Icon width={14} />,
  },
  2: {
    label: 'Header 2',
    icon: <H2Icon width={14} />,
  },
  3: {
    label: 'Header 3',
    icon: <H3Icon width={14} />,
  },
  4: {
    label: 'Header 4',

    icon: <H4Icon width={14} />,
  },
  5: {
    label: 'Header 5',
    icon: <H5Icon width={14} />,
  },
  6: {
    label: 'Header 6',
    icon: <H6Icon width={14} />,
  },
};
