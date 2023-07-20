import { memo, useState } from 'react';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './text-box-field.styles';
import { TextBoxFieldProps } from './text-box-field.types';

export const TextBoxField = memo(
  ({
    blockId,
    blockIndex,
    fieldIndex,
    placeholder,
    text,
    loading,
    error,
    onInput,
    ...props
  }: TextBoxFieldProps) => {
    const [initialText] = useState(text);
    const { addFieldRef } = useRefsContext();

    const commonProps = {
      ref: addFieldRef(blockIndex, fieldIndex),
      id: `${blockId}_${fieldIndex}`,
      noMargin: true,
      contentEditable: true,
      suppressContentEditableWarning: true,
      dangerouslySetInnerHTML: { __html: initialText ?? '' },
      onInput,
      'data-focus-index': fieldIndex,
      'data-placeholder': placeholder,
      $loading: loading,
      $error: error,
    };

    return <S.TextBoxField {...commonProps} {...props} />;
  },
  (prevProps, nextProps) => {
    // CONDITIONS TO RERENDER
    return prevProps.blockIndex === nextProps.blockIndex;
  }
);
