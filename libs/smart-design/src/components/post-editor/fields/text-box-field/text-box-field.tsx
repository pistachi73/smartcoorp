import { useState } from 'react';

import { useRefs } from '../../hooks';

import * as S from './text-box-field.styles';
import { TextBoxFieldProps } from './text-box-field.types';

export const TextBoxField: React.FC<TextBoxFieldProps> = ({
  blockId,
  blockIndex,
  focusIndex,
  placeholder,
  text,
  loading,
  error,
  onInputChange,
  ...props
}) => {
  const [initialText] = useState(text);
  const { addFocusableRef } = useRefs();

  const commonProps = {
    ref: addFocusableRef(blockIndex, focusIndex),
    id: `${blockId}_${focusIndex}`,
    noMargin: true,
    contentEditable: true,
    suppressContentEditableWarning: true,
    dangerouslySetInnerHTML: { __html: initialText },
    onInput: onInputChange,
    'data-focus-index': focusIndex,
    'data-placeholder': placeholder,
    $loading: loading,
    $error: error,
  };

  return <S.TextBoxField {...commonProps} {...props} />;
};
