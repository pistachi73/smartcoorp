'use client';

import { format } from 'date-fns';

import { Body } from '@smartcoorp/ui/body';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import { spaceS } from '@smartcoorp/ui/tokens';

import Image from '../image-16-9-2.jpg';
import type { PostCardProps } from '../post-card.types';

import { Styled as S } from './post-card.styles';

export const SkeletonPostCard = () => {
  return (
    <S.Container>
      <S.SkeletonImageContainer>
        <Skeleton width="100%" height="100%" />
      </S.SkeletonImageContainer>
      <S.Content>
        <S.SkeletonHeadline width="100%" height="24px" />
        <S.SkeletonBodyContainer>
          <Skeleton number={3} width="100%" height="12px" />
        </S.SkeletonBodyContainer>
      </S.Content>
    </S.Container>
  );
};

export const PostCard = ({
  title,
  description,
  readingTime,
  updatedAt,
}: PostCardProps) => {
  if (!title || !description) return <SkeletonPostCard />;
  return (
    <S.Container>
      <S.StyledLink href={''}>
        <S.ImageContainer>
          <S.Image src={Image}></S.Image>
        </S.ImageContainer>
      </S.StyledLink>
      <S.Content>
        <Body
          variant="neutral"
          fontWeight="bold"
          size="small"
          sizeConfined="medium"
          style={{
            marginBottom: spaceS,
          }}
        >
          {format(updatedAt, 'LLLL do, y')} - {readingTime} min read
        </Body>
        <S.StyledLink href={''} tabIndex={-1}>
          <S.Headline size={'large'} sizeConfined={'xlarge'} forwardedAs={'h3'}>
            {title}
          </S.Headline>
        </S.StyledLink>
        {/* <S.Body lineHeight="increased">{description}</S.Body> */}
      </S.Content>
    </S.Container>
  );
};
