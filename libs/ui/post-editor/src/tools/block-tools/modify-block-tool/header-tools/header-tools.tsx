import { Command } from 'cmdk';
import { memo, useCallback, useMemo } from 'react';

import { ObjectEntries } from '@smartcoorp/smart-types';

import { useBlockSelectionUpdaterContext } from '../../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../../contexts/blocks-context';
import { useRefsContext } from '../../../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlUpdaterContext,
} from '../../../../contexts/tool-control-context/tool-control-context';
import type { HeaderBlockProps } from '../../../../post-editor.types';
import { ModifyBlockToolItem } from '../modify-block-tool-item';
import type { ModifyBlockToolProps } from '../modify-block-tool.types';

import { headerModifyBlockToolsMap } from './header-tools.helper';

type Level = HeaderBlockProps['data']['level'];

export const HeaderTools = memo<ModifyBlockToolProps>(
  ({ blockIndex, blockId }) => {
    const { setFieldValue, buildFocusFieldAction } =
      useBlocksDBUpdaterContext();
    const { focusField, prevCaretPosition, fieldRefs } = useRefsContext();

    const { setSelectedBlocks } = useBlockSelectionUpdaterContext();

    const { setIsModifyBlockMenuOpened } = useToolControlUpdaterContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();

    const currentLevel = useMemo(() => {
      const ref = fieldRefs.current[blockIndex][0];
      return Number(ref.nodeName.substring(1)) as Level;
    }, [fieldRefs, blockIndex]);

    const updateHeaderLevel = useCallback(
      async (level: Level) => {
        setFieldValue({
          blockId,
          blockType: 'header',
          field: 'level',
          value: level,
          undo: buildFocusFieldAction({
            fieldId: `${blockId}_0`,
            position: prevCaretPosition.current,
          }),
          redo: buildFocusFieldAction({
            fieldId: `${blockId}_0`,
            position: 'end',
          }),
        });

        setSelectedBlocks([]);
        setToolBlockIndex(-1);
        await setIsModifyBlockMenuOpened(false);
        focusField([blockIndex, 0], 'end');
      },
      [
        blockId,
        blockIndex,
        buildFocusFieldAction,
        focusField,
        prevCaretPosition,
        setFieldValue,
        setIsModifyBlockMenuOpened,
        setSelectedBlocks,
        setToolBlockIndex,
      ]
    );

    return (
      <Command.Group heading={'Header block actions'}>
        {ObjectEntries(headerModifyBlockToolsMap).map(([level, tool]) => {
          const current = level == currentLevel;
          return (
            <Command.Item
              key={`headerTools-${level}`}
              aria-current={current ? 'true' : 'false'}
              onSelect={() => updateHeaderLevel(Number(level) as Level)}
            >
              <ModifyBlockToolItem tool={tool} />
            </Command.Item>
          );
        })}
      </Command.Group>
    );
  }
);
