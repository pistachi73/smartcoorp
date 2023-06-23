import styled from 'styled-components';

import {
  gray300,
  mediaWide,
  spaceL,
  spaceM,
  spaceXS,
} from '@smartcoorp/ui/tokens';

const borderColor = gray300;

const xSpacing = spaceM;
const xSpacingWide = spaceL;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% -${spaceM} * 2);
  background-color: ${({ theme }) => theme.backgroundScreen};
  border-right: 1px solid ${borderColor};
`;

export const LogoContainer = styled.div`
  margin: ${xSpacing};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (${mediaWide}) {
    margin: ${xSpacingWide};
    display: block;
  }
`;

export const Nav = styled.nav`
  padding: ${xSpacing};
  display: flex;
  flex: 1;
  gap: ${spaceXS};
  flex-direction: column;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (${mediaWide}) {
    padding: ${xSpacingWide};
  }
`;

export const Divider = styled.div`
  width: calc(100% - (${xSpacing} * 2));

  height: 1px;
  background-color: ${borderColor};
  margin: 0 ${xSpacing};

  @media (${mediaWide}) {
    width: calc(100% - (${xSpacingWide} * 2));
    margin: 0 ${xSpacingWide};
  }
`;
