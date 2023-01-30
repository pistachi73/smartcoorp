import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context';
import { MODIFY_FIELD_INNERHTML } from '../../contexts/blocks-db-context/undo-redo-reducer';
import { useRefsContext } from '../../contexts/refs-context';
import { TextBoxField } from '../../fields/text-box-field';
import { debounceDelay, getCaretPosition } from '../../helpers';

type ImageCaptionProps = {
  blockId: string;
  blockIndex: number;
  fieldIndex: number;
  caption?: string;
};
export const ImageCaption = ({
  blockIndex,
  fieldIndex,
  caption,
  blockId,
}: ImageCaptionProps) => {
  const dispatchBlocksDB = useBlocksDBUpdaterContext();
  const { fieldRefs, setPrevCaretPosition, prevCaretPosition } =
    useRefsContext();

  const fieldId = `${blockId}_${fieldIndex}`;
  const onCaptionChange = useCallback(
    (e: React.ChangeEvent) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex][0]
      );

      const undoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId,
          setPrevCaretPosition,
          caretPosition: prevCaretPosition.current,
        },
      } as const;

      const redoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId,
          caretPosition: currentCaretPosition,
          setPrevCaretPosition,
        },
      } as const;

      dispatchBlocksDB({
        type: 'MODIFY_FIELD',
        payload: {
          blockId,
          field: 'caption',
          value: e.target.innerHTML,
          undoAction,
          redoAction,
        },
      });

      setPrevCaretPosition(currentCaretPosition);
    },
    [
      fieldRefs,
      blockIndex,
      fieldId,
      setPrevCaretPosition,
      prevCaretPosition,
      dispatchBlocksDB,
      blockId,
    ]
  );

  const deboucedOnCaptionChange = useMemo(
    () => debounce(onCaptionChange, debounceDelay),
    [onCaptionChange]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }, []);

  return (
    <TextBoxField
      blockIndex={blockIndex}
      blockId={blockId}
      fieldIndex={fieldIndex}
      placeholder="Caption"
      text={caption || ''}
      name="caption"
      onInputChange={deboucedOnCaptionChange}
      onKeyDown={handleKeyDown}
      data-field-type="image-caption"
    />
  );
};
