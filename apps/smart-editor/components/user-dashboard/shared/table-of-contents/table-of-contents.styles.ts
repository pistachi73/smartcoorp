'use client';

import styled, { css } from 'styled-components';

import { Headline } from '@smartcoorp/ui/headline';
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
} from '@smartcoorp/ui/tokens';

export const Title = styled(Headline)`
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
export const ThemeBlock = styled.div<{
  $largerStory?: boolean;
  $maxWidth?: boolean;
}>`
  width: 100%;
  height: ${({ $largerStory }) => ($largerStory ? '450px' : '100%')};
  padding: 32px;
  background: ${(props) => props.theme['backgroundScreen']};
  display: flex;
  justify-content: center;
`;

export const ThemeBlockWrapper = styled.div<{ $maxWidth: boolean }>`
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
export const TableOfContentsListItem = styled.li<{
  $selected?: boolean;
  $lader?: boolean;
  $laderDirection?: 'up' | 'down';
  $level: number;
}>`
  position: relative;
  list-style: none;
  padding: ${spaceXS} 0 ${spaceXS} ${spaceL};
  margin-left: ${({ $level }) => `calc(${spaceS} * (${$level} - 1))`};
  border-style: solid;
  border-width: 0 0 0 2px;
  font-size: 14px;

  ${({ $selected }) => css`
    border-color: ${$selected ? primary : gray300};
  `}

  ${({ $lader, $laderDirection, $selected }) =>
    $lader &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: ${$laderDirection === 'up' ? `calc(-${spaceS} - 2px);` : `0`};
        width: ${spaceS};
        height: 2px;
        background-color: ${$selected ? primary : gray300};
      }
    `}
`;

export const TableOfContentsLink = styled.a<{ $selected?: boolean }>`
  ${({ $selected }) => css`
    font-weight: ${$selected ? 600 : 'inherit'};
    color: ${$selected ? primary : gray500} !important;
    &:visited {
      color: ${$selected ? primary : gray500} !important;
    }
  `}

  border: none;
`;

export const TableOfCntentsList = styled.ul`
  margin: ${spaceM} 0 !important;
  padding-left: ${spaceXL};
`;

export const TableOfContentsNav = styled.nav`
  position: sticky;
  top: 100px;
  left: 0;
  /* margin-left: ${spaceXL};  */
`;
