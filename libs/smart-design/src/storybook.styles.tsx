import styled, { css } from 'styled-components';

import { useHeadings, useScrollSpy } from '@smartcoorp/smart-hooks';
import { Body } from '@smartcoorp/ui/body';
import { Hero } from '@smartcoorp/ui/hero';
import {
  gray300,
  gray500,
  mediaConfined,
  primary,
  scale100,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export const Title = styled(Hero)`
  margin-bottom: ${spaceM};
  font-size: ${scale100};
`;

export const SelectContainer = styled.div`
  margin-bottom: ${spaceL};
  margin-top: ${spaceS};
  width: 250px;
  min-width: 250px;
`;

export const Divider = styled.div`
  margin: ${spaceL} 0;
  width: 100%;
  border-bottom: 1px solid ${gray300};
`;
const ThemeBlock = styled.div<{ $largerStory?: boolean; $maxWidth?: boolean }>`
  width: 100%;
  height: ${({ $largerStory }) => ($largerStory ? '450px' : '100%')};
  padding: 32px;
  background: ${(props) => props.theme.backgroundScreen};
  display: flex;
  justify-content: center;
`;

const ThemeBlockWrapper = styled.div<{ $maxWidth: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  ${({ $maxWidth }) =>
    $maxWidth
      ? css`
          width: 100%;
        `
      : css`
          width: 80%;
          @media ${mediaConfined} {
            width: 60%;
          }
        `}
`;
const TableOfContentsListItem = styled.li<{ $selected?: boolean }>`
  list-style: none;
  margin: 0 !important;
  padding: ${spaceXS} 0 ${spaceXS} ${spaceL};
  border-style: solid;
  border-width: 0 0 0 2px;
  font-size: 14px;

  ${({ $selected }) => css`
    border-color: ${$selected ? primary : gray300};
  `}
`;

const TableOfContentsLink = styled.a<{ $selected?: boolean }>`
  ${({ $selected }) => css`
    font-weight: ${$selected ? 600 : 'inherit'};
    color: ${$selected ? primary : gray500} !important;
    &:visited {
      color: ${$selected ? primary : gray500} !important;
    }
  `}
`;

const TableOfCntentsList = styled.ul`
  margin: ${spaceM} 0 !important;
`;

const TableOfContentsNav = styled.nav`
  position: sticky;
  top: ${spaceXXL};
  left: 0;
  margin-left: ${spaceXL};
`;

export const TableOfContent = () => {
  const headings = useHeadings();

  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0% 0% -25% 0%' }
  );

  return (
    <TableOfContentsNav>
      <Body size="xsmall" fontWeight="bold" noMargin>
        ON THIS PAGE
      </Body>
      <TableOfCntentsList>
        {headings.map((heading) => {
          if (heading.level !== 3) return null;
          return (
            <TableOfContentsListItem
              key={heading.id}
              $selected={activeId === heading.id}
              className="sb-unstyled"
            >
              <TableOfContentsLink
                href={`#${heading.id}`}
                target="_self"
                $selected={activeId === heading.id}
              >
                {heading.text}
              </TableOfContentsLink>
            </TableOfContentsListItem>
          );
        })}
      </TableOfCntentsList>
    </TableOfContentsNav>
  );
};

export const Styled = {
  Hero,
  Title,
  SelectContainer,
  Divider,
  TableOfContent,
  ThemeBlock,
  ThemeBlockWrapper,
};
