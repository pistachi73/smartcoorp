'use client';

import { styled } from 'styled-components';

import Link from 'next/link';

import {
  borderRadiusM,
  borderRadiusS,
  borderRadiusXS,
  borderRadiusXXS,
  dropShadowDarkM,
  dropShadowDarkXL,
  dropShadowM,
  dropShadowS,
  focusShadow,
  getFocusShadow,
  gray100,
  gray200,
  gray300,
  gray500,
  gray500_RGBA,
  gray600,
  gray600_RGBA,
  gray700,
  gray900_RGBA,
  motionEasingStandard,
  motionTimeM,
  motionTimeS,
  motionTimeXS,
  primary,
  primary100,
  primary500_RGBA,
  primary600,
  primary600_RGBA,
  primary700,
  scale240,
  scale300,
  spaceL,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXL,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: ${borderRadiusS};
`;

//-----POST CARD STYLE-----
export const PostCardContainer = styled(Container)`
  position: relative;
  border: 1px solid ${gray300};
  overflow: hidden;
`;

export const Toolbar = styled.div`
  width: 100%;
  padding: ${spaceXS} ${spaceL};

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;

  background-color: rgba(${gray900_RGBA}, 0.9);

  button,
  a {
    padding: ${spaceXXS} ${spaceXS};
    display: flex;
    align-items: center;
    gap: ${spaceS};
    color: white;

    border-radius: ${borderRadiusXXS};

    border: 1px solid transparent;
    transition-property: background-color, box-shadow;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};

    p {
      color: white;
    }

    &:hover {
      text-decoration: none;
      background-color: ${gray700};
    }

    &:focus-visible {
      ${getFocusShadow({
        color: primary600,
        colorRGBA: primary500_RGBA,
        withTransition: false,
      })}
    }
  }
`;

export const PostCardImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${gray100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostCardContent = styled.div`
  width: 100%;
  padding: ${spaceXL};

  h2 {
    margin-bottom: ${spaceXXL};
  }
`;

export const PostCardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: black;
    span {
      color: ${gray500};
    }
  }
`;

//---------- NEW POST CARD STYLE -------------

export const NewPostCardContainer = styled(Container)`
  padding: ${spaceXL};
  border: 1px dashed ${gray300};
  text-align: center;

  transition-property: transform, box-shadow, border-color, background-color;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};
  &:hover {
    text-decoration: none;
    transform: translateY(-${spaceXXS});
    background-color: ${primary100};
    border-color: ${primary};
  }

  &:focus-visible {
    ${getFocusShadow({ withTransition: false })}
  }
`;

export const Badge = styled.div`
  padding: ${spaceS};

  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spaceS};

  border: 1px solid ${primary};
  box-shadow: ${dropShadowM};
  border-radius: ${borderRadiusXS};

  svg {
    color: ${primary};
  }
`;
