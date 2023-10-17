'use client';

import { css, styled } from 'styled-components';

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
  gray900,
  gray900_RGBA,
  motionEasingStandard,
  motionTimeM,
  motionTimeS,
  motionTimeXS,
  primary,
  primary100,
  primary100_RGBA,
  primary500_RGBA,
  primary600,
  primary600_RGBA,
  primary700,
  red300,
  scale240,
  scale300,
  spaceL,
  spaceM,
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
export const PostCardContainer = styled(Container)<{ $isSkeleton: boolean }>`
  border: 1px solid ${gray300};
  overflow: hidden;
  display: block;

  ${({ $isSkeleton }) =>
    !$isSkeleton &&
    css`
      transition-property: transform, box-shadow, border-color, background-color;
      transition-duration: ${motionTimeM};
      transition-timing-function: ${motionEasingStandard};

      &:hover {
        text-decoration: none;
        transform: translateY(-${spaceXXS});
        background-color: rgba(${primary100_RGBA}, 0.25);
        border-color: ${primary};
      }
      &:focus-visible {
        ${getFocusShadow({ withTransition: false })}
      }
    `}
`;

export const PostCardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

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

  padding-top: ${spaceXXL};

  p {
    color: black;
    span {
      color: ${gray500};
    }
  }
`;

//---------- NEW POST CARD STYLE -------------

export const NewPostCardContainer = styled(Container)`
  min-height: 390px;
  padding: ${spaceXL};
  border: 1px dashed ${gray300};
  text-align: center;

  transition-property: transform, box-shadow, border-color, background-color;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};
  &:hover {
    text-decoration: none;
    transform: translateY(-${spaceXXS});
    background-color: rgba(${primary100_RGBA}, 0.25);
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

//---------- NO POSTS FOUND CARD STYLE -------------
export const NoPostsFoundContainer = styled(Container)`
  min-height: 390px;
  padding: ${spaceXL};
  border: 1px solid ${gray300};
  text-align: center;
`;

export const NotFoundImageContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: ${spaceM};
  position: relative;
`;
