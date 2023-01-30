import { useMemo, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './list-field.styles';
import { ListFieldProps } from './list-field.types';

export const ListField: React.FC<ListFieldProps> = ({
  blockId,
  blockIndex,
  field,
  fieldIndex,
  items,
  style,
  onInputChange,
  ...props
}) => {
  const [initialItems] = useState(items);

  const { addFieldRef } = useRefsContext();

  const initialRender = useMemo(
    () =>
      initialItems.map((item) => <S.ListItem dangerouslySetInnerHTML={{ __html: `${item}` }} />),
    [initialItems]
  );

  const commonProps = {
    ref: addFieldRef(blockIndex, fieldIndex),
    id: `${blockId}_${fieldIndex}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    'data-focus-index': fieldIndex,
    onInput: onInputChange,
    dangerouslySetInnerHTML: {
      __html: `${initialRender.map((item) => ReactDOMServer.renderToStaticMarkup(item)).join('')}`,
    },
  };
  return style === 'ordered' ? (
    <S.OrderedList {...commonProps} {...props} />
  ) : (
    <S.UnorderedList {...commonProps} {...props} />
  );
};
