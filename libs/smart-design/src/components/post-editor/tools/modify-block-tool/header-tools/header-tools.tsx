import { Command } from 'cmdk';
import { memo, useCallback, useMemo } from 'react';
import { MdOutlineBikeScooter } from 'react-icons/md';

import { useBlockSelectionUpdaterContext } from '../../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../../contexts/blocks-db-context';
import { MODIFY_FIELD } from '../../../contexts/blocks-db-context/blocks-db-reducer/actions';
import { FOCUS_FIELD } from '../../../contexts/blocks-db-context/undo-redo-reducer/actions';
import { UndoRedoAction } from '../../../contexts/blocks-db-context/undo-redo-reducer/undo-redo-reducer.types';
import { useRefsContext } from '../../../contexts/refs-context/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlContext,
} from '../../../contexts/tool-control-context/tool-control-context';
import { HeaderBlockProps } from '../../../post-editor.types';
import { ModifyBlockToolItem } from '../modify-block-tool-item';
import { ModifyBlockToolProps } from '../modify-block-tool.types';

import { headerModifyBlockToolsMap } from './header-tools.helper';

type Level = HeaderBlockProps['data']['level'];

export const HeaderTools = memo<ModifyBlockToolProps>(
  ({ blockIndex, blockId }) => {
    const dispatchBlocksDB = useBlocksDBUpdaterContext();
    const toolControl = useToolControlContext();
    const { focusField, prevCaretPosition, setPrevCaretPosition, fieldRefs } =
      useRefsContext();
    const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
    const setToolBlockIndex = useToolBlockIndexUpdaterContext();

    const currentLevel = useMemo(() => {
      const ref = fieldRefs.current[blockIndex][0];
      return Number(ref.nodeName.substring(1)) as Level;
    }, [fieldRefs, blockIndex]);

    console.log('currentLevel', currentLevel);
    const updateHeaderLevel = useCallback(
      async (level: Level) => {
        // const undo = {
        //   type: FOCUS_FIELD,
        //   payload: {
        //     fieldId: `${blockId}_0`,
        //     position: prevCaretPosition.current,
        //     setPrevCaretPosition,
        //   },
        // } as const;
        dispatchBlocksDB({
          type: MODIFY_FIELD,
          payload: {
            blockId,
            field: 'level',
            value: level,
            // TODO: Add Focus Field Undo Redo action
            // undoAction: undo,
            // redoAction: undo,
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
      <Command.Group heading={'Header block actions'}>
        {(
          Object.keys(headerModifyBlockToolsMap) as unknown as Array<
            keyof typeof headerModifyBlockToolsMap
          >
        ).map((level) => {
          const tool = headerModifyBlockToolsMap[level];
          const current = level == currentLevel;
          return (
            <Command.Item
              aria-current={current ? 'true' : 'false'}
              key={`headerTools-${level}`}
              onSelect={() => updateHeaderLevel(Number(level) as Level)}
            >
              <ModifyBlockToolItem tool={tool} current={current} />
            </Command.Item>
          );
        })}
      </Command.Group>
    );
  }
);
