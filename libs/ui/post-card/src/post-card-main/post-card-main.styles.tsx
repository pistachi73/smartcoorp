'use client';

import styled, { css } from 'styled-components';

import Link from 'next/link';

import { Body as BodyComponent } from '@smartcoorp/ui/body';
import { Headline as HeadlineComponent } from '@smartcoorp/ui/headline';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import {
  borderRadiusS,
  getFocusShadow,
  gray700,
  gray800,
  mediaConfined,
  mediaWide,
  motionEasingEnter,
  motionEasingLeave,
  motionEasingStandard,
  motionTimeM,
  motionTimeS,
  primary,
  scale005,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const Container = styled.div`
  width: 100%;
  min-height: px;

  display: flex;
  flex-direction: column;

  @media ${mediaConfined} {
    flex-direction: row;

    gap: ${spaceXXL};
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: ${borderRadiusS};
  border: 1px solid transparent;

  transition-property: box-shadow, border;
  transition-duration: 300ms;
  transition-timing-function: ${motionEasingEnter};
`;

const ImageContainer = styled.div`
  max-width: 100%;
  aspect-ratio: 5 / 3;
`;
const StyledLink = styled(Link)`
  width: 60%;
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

const Content = styled.div`
  padding: ${spaceL} ${spaceS};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: ${spaceXL};

  @media ${mediaConfined} {
    justify-content: space-between;
    padding-inline: 0;
    gap: 0;
  }
`;

const Headline = styled(HeadlineComponent)`
  /* margin-block: ${spaceM}; */
`;

const Body = styled(BodyComponent)`
  margin-block: ${spaceM};
  color: ${gray800};
`;

const ReadMoreHeadline = styled(BodyComponent)`
  padding-bottom: ${scale005};

  display: inline-flex;
  align-items: center;
  gap: ${spaceXS};

  border-bottom: 1px solid ${primary};

  transition-property: gap;
  transition-timing-function: ${motionEasingEnter};
  transition-duration: ${motionTimeS};

  &:hover {
    gap: ${spaceS};
  }
`;

const TextContent = styled.div``;

export const Styled = {
  Container,
  Image,
  ImageContainer,
  StyledLink,
  Content,
  Headline,
  Body,
  ReadMoreHeadline,
  TextContent,
};
