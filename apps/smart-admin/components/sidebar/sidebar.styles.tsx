import styled from 'styled-components';

import { gray300, spaceL, spaceM, spaceXS } from '@smartcoorp/ui/tokens';

const borderColor = gray300;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% -${spaceM} * 2);
  background-color: ${({ theme }) => theme.backgroundScreen};
  border-right: 1px solid ${borderColor};
`;

export const Nav = styled.nav`
  padding: ${spaceL};
  display: flex;
  flex: 1;
  gap: ${spaceXS};
  flex-direction: column;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Divider = styled.div`
  width: calc(100% - ${spaceL} * 2);
  height: 1px;
  background-color: ${borderColor};
  margin: 0 ${spaceL};
`;
