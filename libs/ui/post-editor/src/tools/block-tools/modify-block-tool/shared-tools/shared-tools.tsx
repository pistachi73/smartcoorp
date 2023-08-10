import { memo } from 'react';

import { ObjectEntries } from '@smartcoorp/smart-types';
import {
  CommandGroup,
  CommandItem,
  DefaultCommandItemContent,
} from '@smartcoorp/ui/command';

import type { ModifyBlockToolProps } from '../modify-block-tool.types';

import {
  SharedModifyBlockTools,
  sharedModifyBlockToolsMap,
} from './shared-tools.helper';
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

    const onSelectMapping: Record<SharedModifyBlockTools, () => void> = {
      up: onMoveUp,
      down: onMoveDown,
      delete: onDelete,
      duplicate: onDuplicate,
    };

    return (
      <CommandGroup heading="Shared tools">
        {ObjectEntries(sharedModifyBlockToolsMap).map(
          ([key, { icon, label, command }]) => {
            const disabled =
              (key === 'up' && isMoveUpDisabled) ||
              (key === 'down' && isMoveDownDisabled);
            return (
              <CommandItem
                key={key}
                onSelect={onSelectMapping[key]}
                disabled={disabled}
              >
                <DefaultCommandItemContent
                  label={label}
                  command={command}
                  icon={icon}
                  onCommandPress={onSelectMapping[key]}
                  size="small"
                ></DefaultCommandItemContent>
              </CommandItem>
            );
          }
        )}
      </CommandGroup>
    );
  }
);
