import DOMPurify from 'dompurify';
import { ListBlockProps } from 'libs/ui/post-editor/src/post-editor.types';
import { css, styled } from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  gray800,
  primary,
  primary_RGBA,
  scale090,
  scale100,
  scale120,
  scale130,
  scale140,
  scale150,
  scale200,
  space3XL,
  space4XL,
  spaceL,
  spaceM,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const OrderedList = styled.ol<{ $listId: string }>`
  list-style: none;
  margin: ${spaceXL} 0;
  margin-top: ${spaceXXL};
  counter-reset: ${(props) => props.$listId};
  padding-left: ${space4XL};
`;
const UnorderedList = styled.ul`
  list-style: none;
  margin: ${spaceXL} 0;
  padding-left: ${space4XL};
`;

const ListItem = styled.li<{ $listId?: string }>`
  font-size: ${scale090};
  margin-bottom: ${spaceL};
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
    color: rgba(${primary_RGBA}, 0.8);
    margin-left: -1.5em;
    position: absolute;
    top: 1px;
    content: ${({ $listId }) => ($listId ? `counter(${$listId}) '. '` : `'•'`)};
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
