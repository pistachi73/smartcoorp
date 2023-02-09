import { Command } from 'cmdk';
import { memo, useCallback, useMemo } from 'react';
import { MdOutlineBikeScooter } from 'react-icons/md';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-db-context';
import { MODIFY_FIELD } from '../../../contexts/blocks-db-context/blocks-db-reducer/actions';
import { useRefsContext } from '../../../contexts/refs-context/refs-context';
import { FieldRefs } from '../../../contexts/refs-context/refs.types';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import { ListBlockProps } from '../../../post-editor.types';
import { ModifyBlockToolItem } from '../modify-block-tool-item';
import { ModifyBlockToolProps } from '../modify-block-tool.types';

import { listModifyBlockToolsMap } from './list-tools.helper';

type ListStyle = ListBlockProps['data']['style'];

export const ListTools = memo<ModifyBlockToolProps>(
  ({ blockIndex, blockId }) => {
    const dispatchBlocksDB = useBlocksDBUpdaterContext();
    const toolControl = useToolControlContext();
    const { focusField, fieldRefs } = useRefsContext();
    const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();

    const currentStyle: ListStyle = useMemo(() => {
      const ref = fieldRefs.current[blockIndex][0];
      return ref.nodeName === 'OL' ? 'ordered' : 'unordered';
    }, [fieldRefs, blockIndex]);

    const updateListStyle = useCallback(
      async (style: ListBlockProps['data']['style']) => {
        dispatchBlocksDB({
          type: MODIFY_FIELD,
          payload: {
            blockId,
            field: 'style',
            value: style,
          },
        });

        setSelectedBlocks([]);
        setToolBlockIndex(-1);
        await toolControl.setIsModifyBlockMenuOpened(false);
        focusField([blockIndex, 0], 'end');
      },
      [
        blockId,
        blockIndex,
        dispatchBlocksDB,
        focusField,
        setSelectedBlocks,
        setToolBlockIndex,
        toolControl,
      ]
    );

    return (
      <Command.Group heading={'List block actions'}>
        {(
          Object.keys(listModifyBlockToolsMap) as unknown as Array<
            keyof typeof listModifyBlockToolsMap
          >
        ).map((style) => {
          const tool = listModifyBlockToolsMap[style];
          const current = style === currentStyle;
          return (
            <Command.Item
              aria-current={current ? 'true' : undefined}
              key={style}
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
