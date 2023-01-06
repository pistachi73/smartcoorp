import { useMemo, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { useRefs } from '../../hooks';

import * as S from './list-field.styles';
import { ListFieldProps } from './list-field.types';

export const ListField: React.FC<ListFieldProps> = ({
  blockId,
  blockIndex,
  field,
  focusIndex,
  items,
  style,
  onInputChange,
  ...props
}) => {
  const [initialItems] = useState(items);

  const { addFocusableRef } = useRefs();

  const initialRender = useMemo(
    () =>
      initialItems.map((item) => (
        <S.ListItem dangerouslySetInnerHTML={{ __html: `${item}` }} />
      )),
    [initialItems]
  );

  const commonProps = {
    ref: addFocusableRef(blockIndex, focusIndex),
    id: `${blockId}_${focusIndex}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    'data-focus-index': focusIndex,
    onInput: onInputChange,
    dangerouslySetInnerHTML: {
      __html: `${initialRender
        .map((item) => ReactDOMServer.renderToStaticMarkup(item))
        .join('')}`,
    },
  };
  return style === 'ordered' ? (
    <S.OrderedList {...commonProps} {...props} />
  ) : (
    <S.UnorderedList {...commonProps} {...props} />
  );
};
