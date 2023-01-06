import { useEffect, useState } from 'react';

import { DispatchCommand } from '../../contexts/commands-context';
import { getCaretPosition } from '../../helpers';
import { useRefs } from '../use-refs';

import { useCommands } from './use-commands';

export const useDispatchAsyncCommand = <T>(value?: T, prevValue?: T | null) => {
  const { prevCaretPosition } = useRefs();
  const { addCommand } = useCommands();
  const [dispatchCommand, setDispatchCommand] = useState<DispatchCommand | null>(null);

  useEffect(() => {
    if (typeof prevValue === 'undefined' || prevValue === null || !dispatchCommand) return;

    switch (dispatchCommand.type) {
      case 'editTextField': {
        const { ref, blockIndex, field, fieldId } = dispatchCommand;
        const sharedPayload = { fieldId, ref, blockIndex, field };
        const currentCaretPosition = getCaretPosition(ref);
        addCommand({
          action: {
            type: 'editTextField',
            payload: {
              ...sharedPayload,
              text: value as string,
              caretPosition: currentCaretPosition,
            },
          },
          inverse: {
            type: 'editTextField',
            payload: {
              ...sharedPayload,
              text: prevValue as string,
              caretPosition: prevCaretPosition.current,
            },
          },
        });
        prevCaretPosition.current = currentCaretPosition;

        break;
      }
      case 'editListField': {
        const { ref, blockIndex, field, fieldId } = dispatchCommand;
        const sharedPayload = { ref, blockIndex, field, fieldId };

        const currentCaretPosition = getCaretPosition(ref);

        addCommand({
          action: {
            type: 'editListField',
            payload: {
              ...sharedPayload,
              items: value as string[],
              caretPosition: currentCaretPosition,
            },
          },
          inverse: {
            type: 'editListField',
            payload: {
              ...sharedPayload,
              items: prevValue as string[],
              caretPosition: prevCaretPosition.current,
            },
          },
        });

        prevCaretPosition.current = currentCaretPosition;
        break;
      }
      case 'splitTextBlock': {
        const { blockIndex, ref, createdParagraphBlock, field, fieldId } = dispatchCommand;
        const sharedPayload = { ref, blockIndex, field, fieldId };

        addCommand({
          action: {
            type: 'splitTextBlock',
            payload: {
              ...sharedPayload,
              text: value as string,
              createdBlock: {
                id: createdParagraphBlock.id,
                type: 'paragraph',
                data: {
                  text: createdParagraphBlock.text,
                },
              },
            },
          },
          inverse: {
            type: 'mergeTextBlock',
            payload: {
              ...sharedPayload,
              text: prevValue as string,
              caretPosition: prevCaretPosition.current,
            },
          },
        });

        prevCaretPosition.current = 0;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchCommand]);

  return { dispatchAsyncCommand: setDispatchCommand };
};
