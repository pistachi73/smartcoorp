'use client';

import { css, styled } from 'styled-components';

import { Button } from '@smartcoorp/ui/button';
import { DropdownMenuContent } from '@smartcoorp/ui/dropdown-menu';
import {
  borderRadiusS,
  borderRadiusXS,
  dropShadowM,
  getFocusShadow,
  gray100,
  gray200,
  gray200_RGBA,
  gray300,
  gray500,
  motionEasingStandard,
  motionTimeM,
  primary,
  primary100_RGBA,
  space3XL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
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
  position: relative;
  border: 1px solid ${gray300};
  overflow: hidden;
  display: grid;
  width: 100%;
  grid-template-rows: 200px auto;
  grid-template-columns: 1fr;

  ${({ $isSkeleton }) =>
    !$isSkeleton &&
    css`
      transition-property: transform, box-shadow, border-color, background-color;
      transition-duration: ${motionTimeM};
      transition-timing-function: ${motionEasingStandard};

      &:hover {
        text-decoration: none;
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
  min-width: 100%;
  height: 200px;

  img {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostCardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: ${spaceXL};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: auto;

  p {
    margin-bottom: ${spaceS};
  }
  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

export const PostCardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: ${space3XL};

  p {
    color: black;
    span {
      color: ${gray500};
    }
  }
`;

export const PostCardOptionsButton = styled(Button)`
  position: absolute;
  z-index: 1;
  top: ${spaceM};
  left: ${spaceM};

  background-color: rgba(${gray200_RGBA}, 0.5);
  backdrop-filter: blur(2px);

  &:hover {
    background-color: rgba(white, 0.5);
  }
`;

export const PostCardOptionsContent = styled(DropdownMenuContent)`
  padding: ${spaceS};
  border-radius: ${borderRadiusXS};
  border: 1px solid ${gray300};
  box-shadow: ${dropShadowM};
  background-color: white;

  display: flex;
  flex-direction: column;
  gap: ${spaceXS};

  div {
    padding: 0;
  }
  button,
  a {
    width: 100%;
    height: 24px !important;
    justify-content: left;
    padding: ${spaceM};

    &:hover {
      background-color: ${gray100};
    }
  }
`;

//---------- NEW POST CARD STYLE -------------

export const NewPostCardContainer = styled(Container)<{
  $limitReach?: boolean;
}>`
  min-height: 372px;
  padding: ${spaceXL};
  border: 1px dashed ${gray300};
  text-align: center;

  transition-property: transform, box-shadow, border-color, background-color;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};

  ${({ $limitReach }) =>
    !$limitReach
      ? css`
          &:hover {
            text-decoration: none;
            background-color: rgba(${primary100_RGBA}, 0.25);
            border-color: ${primary};
          }
          &:focus-visible {
            ${getFocusShadow({ withTransition: false })}
          }
        `
      : css`
          background-color: ${gray200};
          cursor: default;
        `}
`;

export const Badge = styled.div`
  padding: ${spaceS};

  height: 42px;

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

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spaceS};
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
