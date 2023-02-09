import { Command } from 'cmdk';
import { memo } from 'react';

import { ModifyBlockToolItem } from '../modify-block-tool-item';
import type { ModifyBlockToolProps } from '../modify-block-tool.types';

import { sharedModifyBlockToolsMap } from './shared-tools.helper';
import { useSharedTools } from './use-shared-tools';

export const SharedTools = memo<ModifyBlockToolProps>(
  ({ blockIndex, blockId }) => {
    const {
      onDelete,
      onDuplicate,
      onMoveDown,
      onMoveUp,
      isMoveUpDisabled,
      isMoveDownDisabled,
    } = useSharedTools({
      blockIndex,
      blockId,
    });

    return (
      <Command.Group>
        <Command.Item onSelect={onMoveUp} disabled={isMoveUpDisabled}>
          <ModifyBlockToolItem tool={sharedModifyBlockToolsMap.up} />
        </Command.Item>

        <Command.Item onSelect={onDelete}>
          <ModifyBlockToolItem tool={sharedModifyBlockToolsMap.delete} />
        </Command.Item>
        <Command.Item onSelect={onMoveDown} disabled={isMoveDownDisabled}>
          <ModifyBlockToolItem tool={sharedModifyBlockToolsMap.down} />
        </Command.Item>
        <Command.Item onSelect={onDuplicate}>
          <ModifyBlockToolItem tool={sharedModifyBlockToolsMap.duplicate} />
        </Command.Item>
      </Command.Group>
    );
  }
);
