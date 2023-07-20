import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
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
  const { setFieldValue, buildModifyFieldInnerHTMLAction } =
    useBlocksDBUpdaterContext();
  const { fieldRefs, setPrevCaretPosition, prevCaretPosition } =
    useRefsContext();

  const fieldId = `${blockId}_${fieldIndex}`;
  const onCaptionChange = useCallback(
    (e: any) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex][0]
      );

      setFieldValue({
        blockId,
        blockType: 'image',
        field: 'caption',
        value: e.target.innerHTML,
        undo: buildModifyFieldInnerHTMLAction({
          fieldId,
          caretPosition: prevCaretPosition.current,
        }),
        redo: buildModifyFieldInnerHTMLAction({
          fieldId,
          caretPosition: currentCaretPosition,
        }),
      });

      setPrevCaretPosition(currentCaretPosition);
    },
    [
      fieldRefs,
      blockIndex,
      setFieldValue,
      blockId,
      buildModifyFieldInnerHTMLAction,
      fieldId,
      prevCaretPosition,
      setPrevCaretPosition,
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
      size="small"
      blockIndex={blockIndex}
      blockId={blockId}
      fieldIndex={fieldIndex}
      placeholder="Caption"
      text={caption || ''}
      onInput={deboucedOnCaptionChange}
      onKeyDown={handleKeyDown}
      data-field-type="image-caption"
    />
  );
};
