import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { TextBoxField } from '../../fields/text-box-field';
import { debounceDelay } from '../../helpers';
import { useRefs } from '../../hooks';
import { useDispatchAsyncCommand } from '../../hooks/use-commands/use-dispatch-async-commands';
import { usePreviousPersistentWithMatcher } from '../../hooks/use-previous';

type ImageCaptionProps = {
  blockId: string;
  blockIndex: number;
  focusIndex: number;
  caption?: string;
};
export const ImageCaption = ({ blockIndex, focusIndex, caption, blockId }: ImageCaptionProps) => {
  const { focusableRefs } = useRefs();
  const { updateBlockFields } = useBlockUpdaterContext();
  const prevCaption = usePreviousPersistentWithMatcher(caption);
  const { dispatchAsyncCommand } = useDispatchAsyncCommand(caption, prevCaption);

  const onCaptionChange = useCallback(
    (e: React.ChangeEvent) => {
      updateBlockFields(blockIndex, { caption: e.target.innerHTML });
      dispatchAsyncCommand({
        type: 'editTextField',
        fieldId: `${blockId}_${focusIndex}`,
        field: 'caption',
        blockIndex,
        ref: focusableRefs.current[blockIndex][focusIndex],
      });
    },
    [updateBlockFields, blockIndex, dispatchAsyncCommand, blockId, focusIndex, focusableRefs]
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
      focusIndex={focusIndex}
      placeholder="Caption"
      text={caption || ''}
      name="caption"
      onInputChange={deboucedOnCaptionChange}
      onKeyDown={handleKeyDown}
      data-block-type="image-caption"
    />
  );
};
