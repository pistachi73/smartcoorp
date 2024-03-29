import { memo, useMemo } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './list-field.styles';
import { ListFieldProps } from './list-field.types';

export const ListField: React.FC<ListFieldProps> = memo(
  ({
    blockId,
    blockIndex,
    field,
    fieldIndex,
    items,
    style,
    onInput,
    ...props
  }) => {
    const { addFieldRef } = useRefsContext();

    const initialRender = useMemo(
      () =>
        items.map((item, index) => (
          <S.ListItem
            key={`${blockId}_${fieldIndex}_${index}`}
            dangerouslySetInnerHTML={{ __html: `${item}` }}
          />
        )),
      [blockId, fieldIndex, items]
    );

    const commonProps = {
      ref: addFieldRef(blockIndex, fieldIndex) as any,
      id: `${blockId}_${fieldIndex}`,
      contentEditable: true,
      suppressContentEditableWarning: true,
      'data-focus-index': fieldIndex,
      onInput,
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
  },
  (prevProps, nextProps) => {
    // CONDITIONS TO RERENDER
    return (
      prevProps.style === nextProps.style &&
      prevProps.blockIndex === nextProps.blockIndex
    );
  }
);
