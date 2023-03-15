import { memo } from 'react';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './text-field.styles';
import { TextFieldProps, TextFieldVariant } from './text-field.types';

export const TextField = memo(
  <T extends TextFieldVariant>({
    blockId,
    chainId,
    variant,
    text,
    fieldIndex,
    blockIndex,
    field,
    onInputChange,
    size,
    ...props
  }: TextFieldProps<T>) => {
    const { addFieldRef } = useRefsContext();

    const commonProps = {
      ref: addFieldRef(blockIndex, fieldIndex),
      id: `${blockId}_${fieldIndex}`,
      size: size,
      noMargin: true,
      contentEditable: true,
      suppressContentEditableWarning: true,
      dangerouslySetInnerHTML: { __html: text },
      'data-field-index': fieldIndex,
      onInput: onInputChange,
      'data-block-type': variant,
    };

    if (variant === 'header') {
      return <S.StyledHeadline {...commonProps} {...props} />;
    } else if (variant === 'paragraph') {
      return <S.StyledBody {...commonProps} {...props} />;
    }

    return null;
  },
  (prevProps, nextProps) => {
    // CONDITIONS TO RERENDER
    return (
      prevProps.size === nextProps.size &&
      prevProps.blockIndex === nextProps.blockIndex
    );
  }
);
