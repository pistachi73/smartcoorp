'use client';

import styled, { css } from 'styled-components';

import Link from 'next/link';

import { Body as BodyComponent } from '@smartcoorp/ui/body';
import { Headline as HeadlineComponent } from '@smartcoorp/ui/headline';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import {
  borderRadiusS,
  borderRadiusXS,
  focusShadow,
  getFocusShadow,
  gray500,
  gray700,
  gray800,
  mediaConfined,
  mediaWide,
  motionEasingStandard,
  motionTimeXXS,
  scale330,
  scale390,
  spaceL,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: ${borderRadiusS};
  border: 1px solid transparent;

  transition-property: box-shadow, border;
  transition-duration: 200ms;
  transition-timing-function: ${motionEasingStandard};
`;

const ImageContainer = styled.div`
  max-width: 100%;
  aspect-ratio: 1;
`;

const SkeletonImageContainer = styled.div`
  max-width: 100%;
  aspect-ratio: 1;
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  border: none;

  &:focus,
  &:hover {
    outline: none;
    ${Image} {
      ${getFocusShadow({
        shadowWidth: 4,
      })}
    }
  }
`;

const Container = styled.div`
  /* min-width: 244px;
  max-width: 356px; */
  border: none;
`;

const Content = styled.div`
  padding: ${spaceL} ${spaceS};
`;

const Headline = styled(HeadlineComponent)`
  margin-bottom: ${spaceM};
`;

const Body = styled(BodyComponent)`
  margin-block: ${spaceM};
  color: ${gray800};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SkeletonHeadline = styled(Skeleton)`
  margin-block: ${spaceM};
`;

const SkeletonBodyContainer = styled.div`
  padding-block: ${spaceM};
`;

export const Styled = {
  Container,
  Headline,
  Body,
  Content,
  Image,
  StyledLink,
  ImageContainer,
  SkeletonImageContainer,
  SkeletonBodyContainer,
  SkeletonHeadline,
};
