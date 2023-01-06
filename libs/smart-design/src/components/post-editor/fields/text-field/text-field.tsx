import { useState } from 'react';

import { useRefs } from '../../hooks/use-refs';

import * as S from './text-field.styles';
import { TextFieldProps, TextFieldVariant } from './text-field.types';

export const TextField = <T extends TextFieldVariant>({
  blockId,
  variant,
  text,
  focusIndex,
  blockIndex,
  field,
  onInputChange,
  ...props
}: TextFieldProps<T>) => {
  const [initialText] = useState(text);
  const { addFocusableRef } = useRefs();

  const commonProps = {
    ref: addFocusableRef(blockIndex, focusIndex),
    id: `${blockId}_${focusIndex}`,
    noMargin: true,
    contentEditable: true,
    suppressContentEditableWarning: true,
    dangerouslySetInnerHTML: { __html: initialText },
    'data-focus-index': focusIndex,
    onInput: onInputChange,
  };

  if (variant === 'header') {
    return <S.StyledHeadline {...commonProps} {...props} />;
  } else if (variant === 'paragraph') {
    return <S.StyledBody {...commonProps} {...props} />;
  }

  return null;
};
