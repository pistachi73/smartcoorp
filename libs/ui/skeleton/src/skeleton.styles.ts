'use client';

import { keyframes, styled } from 'styled-components';

import {
  borderRadiusXS,
  motionEasingStandard,
  spaceM,
} from '@smartcoorp/ui/tokens';

import type { StyleMeasure } from './skeleton.types';

export const skeletonAnimation = keyframes`
  100% {
      transform: translateX(100%);
    }`;

type TransientSkeletonProps = {
  $width?: StyleMeasure;
  $height?: StyleMeasure;
};

export const StyledSkeleton = styled.div<TransientSkeletonProps>`
  --base-color: ${({ theme }) => theme.skeleton.baseColor};
  --highlight-color: ${({ theme }) => theme.skeleton.highlightColor};

  background-color: var(--base-color);
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;

  position: relative;
  user-select: none;
  overflow: hidden;

  border-radius: ${borderRadiusXS};

  &:not(:last-of-type) {
    margin-bottom: ${spaceM};
  }

  &::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(
      90deg,
      var(--base-color),
      var(--highlight-color),
      var(--base-color)
    );
    transform: translateX(-100%);

    animation-name: ${skeletonAnimation};
    animation-direction: normal;
    animation-duration: 1.5s;
    animation-timing-function: ${motionEasingStandard};
    animation-iteration-count: infinite;
  }
`;
