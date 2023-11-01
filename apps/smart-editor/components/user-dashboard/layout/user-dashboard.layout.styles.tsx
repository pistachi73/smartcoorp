'use client';

import styled from 'styled-components';

import {
  borderRadiusS,
  borderRadiusXS,
  focusShadow,
  gray100,
  gray100_RGBA,
  gray200,
  gray300,
  gray500,
  gray900,
  mediaWide,
  motionEasingStandard,
  motionTimeS,
  motionTimeXS,
  motionTimeXXS,
  primary,
  primary300,
  scale070,
  space3XL,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXL,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  position: relative;
  display: block;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media ${mediaWide} {
    display: flex;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  flex-grow: 10;
  background-color: white;
`;

export const Header = styled.header`
  height: 70px;
  width: 100%;

  display: flex;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;

  backdrop-filter: blur(3px);
  background-color: rgba(${gray100_RGBA}, 0.85);
  border-bottom: 1px solid ${gray300};

  label {
    padding: ${spaceS};
    display: block;

    border-radius: ${borderRadiusS};

    cursor: pointer;
    transition: background-color ${motionTimeXS} ${motionEasingStandard};
    border: 1px solid ${gray300};

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${gray200};
    }
  }
  @media ${mediaWide} {
    label {
      display: none;
    }
  }
`;
export const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;

  padding-inline: ${spaceM};
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: ${spaceL};

  @media ${mediaWide} {
    padding-inline: ${space3XL};
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 69px);

  padding: ${spaceXL} ${spaceM};

  @media ${mediaWide} {
    padding: ${spaceXL} ${space3XL};
  }
`;

// --------------sidebar---------------- //

export const SidebarContainer = styled.aside`
  height: 100vh;
  min-width: 260px;
  max-width: 260px;
  padding: ${spaceXL};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${space3XL};

  background-color: ${gray200};
  border-right: 1px solid ${gray300};

  transition: transform ${motionTimeS} ${motionEasingStandard};

  @media ${mediaWide} {
    position: sticky;
    transition: none;
  }
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: block;
    padding: ${spaceS};

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${gray500};
    border-radius: ${borderRadiusS};
    border: 1px solid ${gray300};

    transition-property: background-color, color;
    transition-duration: ${motionTimeS};
    transition-timing-function: ${motionEasingStandard};

    cursor: pointer;

    &:hover {
      background-color: white;
      color: black;
    }
  }

  @media ${mediaWide} {
    label {
      display: none;
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${spaceXS};

  span {
    color: ${primary};
  }

  p {
    line-height: 16px;
  }
`;

export const Nav = styled.nav`
  height: 100%;
  width: 100%;
`;

export const NavGroup = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  margin-bottom: ${spaceXXL};

  list-style: none;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spaceM};
`;

export const NavItem = styled.li`
  width: 100%;

  a {
    width: 100%;
    padding: ${spaceS} ${spaceM};

    font-size: ${scale070};
    color: black;
    border-radius: ${borderRadiusXS};

    display: flex;
    align-items: center;
    gap: ${spaceM};

    border-width: 1px;
    border-style: solid;
    border-color: transparent;

    transition-property: background-color, color;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};

    svg {
      margin-right: ${spaceXS};

      transition-property: transform;
      transition-duration: ${motionTimeXS};
      transition-timing-function: ${motionEasingStandard};
    }

    &.active {
      font-weight: bold;
      svg {
        color: ${primary};
      }
    }

    &:focus-visible {
      background-color: white;
      ${focusShadow}
    }

    &:hover {
      background-color: ${gray100};
      text-decoration: none;

      svg {
        transform: rotate(10deg) translateX(${spaceXXS});
      }
    }
  }
`;

export const Profile = styled.button`
  position: relative;
  width: 100%;
  padding: ${spaceS};

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border-radius: ${borderRadiusS};

  border-width: 1px;
  border-style: solid;
  border-color: ${gray300};

  transition-property: background-color;
  transition-duration: ${motionTimeXXS};
  transition-timing-function: ${motionEasingStandard};
  svg {
    color: ${gray500};
  }

  &:focus-visible {
    ${focusShadow}
  }

  &:hover {
    background-color: ${gray100};
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: ${spaceS};

  overflow: hidden;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid ${primary};

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin: 4px;
    width: 36px;
    border: 1px solid ${primary300};
    border-radius: 50%;
  }
`;

export const ProfileInformation = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  overflow: hidden;
`;

// --------------profile dropdown---------------- //
export const ProfileDropdownContent = styled.div`
  margin: 0;
  width: 100%;
  padding: ${spaceS};

  list-style: none;
  background-color: white;
  border: 1px solid ${gray300};
  border-radius: ${borderRadiusS};

  svg {
    margin-right: ${spaceM};
    transition-property: transform, color;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};
  }

  div {
    padding: ${spaceXS};

    &:not(:last-child) {
      margin-bottom: ${spaceXS};
    }
    &:hover,
    &:focus {
      svg {
        transform: rotate(10deg) translateX(${spaceXXS});
      }
    }
  }
`;

// --------------upgrade---------------- //
export const Upgrade = styled.div`
  padding: ${spaceL};
  margin-top: ${spaceL};

  background-color: ${gray900};

  text-align: center;
  border-radius: ${borderRadiusS};

  h4,
  p {
    color: white;
  }
  p {
    margin-bottom: ${spaceL};
  }

  button {
    width: 100%;
  }
`;

export const Input = styled.input`
  display: none;

  @media (max-width: 992px) {
    &:checked + ${SidebarContainer} {
      transform: translateX(0);
    }
    &:not(:checked) + ${SidebarContainer} {
      transform: translateX(-100%);
    }
  }
`;
