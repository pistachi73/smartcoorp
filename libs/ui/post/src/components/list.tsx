import DOMPurify from 'dompurify';
import { ListBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { css, styled } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  gray800,
  primary_RGBA,
  scale080,
  scale090,
  space3XL,
  space4XL,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const OrderedList = styled.ol<{ $listId: string }>`
  list-style: none;
  margin: ${spaceL} 0;
  counter-reset: ${(props) => props.$listId};
  padding-left: ${space3XL};
`;
const UnorderedList = styled.ul`
  list-style: none;
  margin: ${spaceL} 0;
  padding-left: ${space3XL};
`;

const ListItem = styled.li<{ $listId?: string }>`
  margin-bottom: ${spaceM};
  color: ${gray800};
  align-items: center;

  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $listId }) =>
    $listId &&
    css`
      counter-increment: ${$listId};
    `}

  &::before {
    font-size: ${scale080};

    color: rgba(${primary_RGBA}, 1);
    margin-left: -1.5em;
    position: absolute;
    top: 0;
    content: ${({ $listId }) => ($listId ? `counter(${$listId}) '. '` : `'•'`)};
    line-height: 1.7;
  }
`;

const StyledBody = styled(Body)`
  color: ${gray800};
`;

export const List = ({ data: { style, items }, id }: ListBlockProps) => {
  if (!items || !items.length) return null;

  const listItems = items.map((item) => {
    const purifiedText = DOMPurify.sanitize(item);
    if (!purifiedText) return null;
    return (
      <ListItem key={item} {...(style === 'ordered' && { $listId: id })}>
        <StyledBody
          id={id}
          size="medium"
          lineHeight="increased"
          dangerouslySetInnerHTML={{ __html: purifiedText }}
          noMargin
        />
      </ListItem>
    );
  });

  return style === 'ordered' ? (
    <OrderedList $listId={id}>{listItems}</OrderedList>
  ) : (
    <UnorderedList>{listItems}</UnorderedList>
  );
};
