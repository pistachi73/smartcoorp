import { ModifyBlockTool } from '../modify-block-tool.types';

import { DeleteIcon } from './icons/delete-icon';
import { DownIcon } from './icons/down-icon';
import { DuplicateIcon } from './icons/duplicate-icon';
import { UpIcon } from './icons/up-icon';

export type SharedModifyBlockTools = 'up' | 'down' | 'delete' | 'duplicate';

export const sharedModifyBlockToolsMap: Record<
  SharedModifyBlockTools,
  ModifyBlockTool
> = {
  up: {
    label: 'Move up',
    command: ['&#8984;', '&#8593;'], // ⌘ ↑
    icon: <UpIcon width={10} />,
  },
  down: {
    label: 'Move down',

    command: ['&#8984;', '&#8595;'], // ⌘ ↓
    icon: <DownIcon width={10} />,
  },
  delete: {
    label: 'Delete',
    command: ['&#8984;', '&#8592;'], // ⌘ ←
    icon: <DeleteIcon width={10} />,
  },
  duplicate: {
    label: 'Duplicate block',
    command: ['&#8984;', 'd'], // ⌘ d
    icon: <DuplicateIcon width={14} />,
  },
};
