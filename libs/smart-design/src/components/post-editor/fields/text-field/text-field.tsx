import { useEffect, useState } from 'react';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './text-field.styles';
import { TextFieldProps, TextFieldVariant } from './text-field.types';

export const TextField = <T extends TextFieldVariant>({
  blockId,
  chainId,
  variant,
  text,
  fieldIndex,
  blockIndex,
  field,
  onInputChange,
  ...props
}: TextFieldProps<T>) => {
  const [initialText, setInitialText] = useState(text);

  const { addFieldRef } = useRefsContext();

  const commonProps = {
    ref: addFieldRef(blockIndex, fieldIndex),
    id: `${blockId}_${fieldIndex}`,
    noMargin: true,
    contentEditable: true,
    suppressContentEditableWarning: true,
    dangerouslySetInnerHTML: { __html: initialText },
    'data-field-index': fieldIndex,
    onInput: onInputChange,
  };

  if (variant === 'header') {
    return <S.StyledHeadline {...commonProps} {...props} />;
  } else if (variant === 'paragraph') {
    return <S.StyledBody {...commonProps} {...props} />;
  }

  return null;
};
