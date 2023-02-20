import { Command } from 'cmdk';
import { memo, useCallback, useMemo } from 'react';

import { ObjectEntries } from '@smartcoorp/smart-types';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-context';
import { useRefsContext } from '../../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlUpdaterContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import type { ListBlockProps } from '../../../post-editor.types';
import { ModifyBlockToolItem } from '../modify-block-tool-item';
import type { ModifyBlockToolProps } from '../modify-block-tool.types';

import { listModifyBlockToolsMap } from './list-tools.helper';

type ListStyle = ListBlockProps['data']['style'];

export const ListTools = memo<ModifyBlockToolProps>(
  ({ blockIndex, blockId }) => {
    const { setFieldValue, buildFocusFieldAction } =
      useBlocksDBUpdaterContext();
    const { setIsModifyBlockMenuOpened } = useToolControlUpdaterContext();
    const { focusField, fieldRefs } = useRefsContext();
    const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();

    const currentStyle: ListStyle = useMemo(() => {
      const ref = fieldRefs.current[blockIndex][0];
      return ref.nodeName === 'OL' ? 'ordered' : 'unordered';
    }, [fieldRefs, blockIndex]);

    const updateListStyle = useCallback(
      async (style: ListBlockProps['data']['style']) => {
        const undo = buildFocusFieldAction({
          fieldId: `${blockId}_0`,
          position: 'end',
        });

        setFieldValue({
          blockId,
          blockType: 'list',
          field: 'style',
          value: style,
          undo,
          redo: undo,
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
        setFieldValue,
        setIsModifyBlockMenuOpened,
        setSelectedBlocks,
        setToolBlockIndex,
      ]
    );

    return (
      <Command.Group heading={'List block actions'}>
        {ObjectEntries(listModifyBlockToolsMap).map(([style, tool]) => {
          const current = style === currentStyle;
          return (
            <Command.Item
              key={`listTools-${style}`}
              aria-current={current ? 'true' : 'false'}
              onSelect={() => updateListStyle(style)}
            >
              <ModifyBlockToolItem tool={tool} current={current} />
            </Command.Item>
          );
        })}
      </Command.Group>
    );
  }
);
