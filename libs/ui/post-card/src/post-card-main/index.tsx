'use client';

import { format } from 'date-fns';
import { BiRightArrowAlt } from 'react-icons/bi';

import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { spaceS } from '@smartcoorp/ui/tokens';

import Image from '../image-16-9-2.jpg';
import type { PostCardProps } from '../post-card.types';

import { Styled as S } from './post-card-main.styles';

export const PostCardMain = ({
  title,
  description,
  readingTime,
  updatedAt,
}: PostCardProps) => {
  return (
    <Grid>
      <Row noMargin>
        <Col size={12} sizeConfined={7}>
          <S.StyledLink href={''}>
            <S.ImageContainer>
              <S.Image src={Image}></S.Image>
            </S.ImageContainer>
          </S.StyledLink>
        </Col>
        <Col size={12} sizeConfined={4}>
          <S.Content>
            <div>
              <S.StyledLink href={''} tabIndex={0}>
                <Body
                  variant="neutral"
                  fontWeight="bold"
                  size="medium"
                  sizeConfined="large"
                  style={{
                    marginBottom: spaceS,
                  }}
                >
                  {format(updatedAt, 'LLLL do, y')} - {readingTime} min read
                </Body>
                <S.Headline
                  size="xlarge"
                  sizeConfined="xxlarge"
                  forwardedAs={'h3'}
                >
                  {title}
                </S.Headline>
              </S.StyledLink>
              <S.Body lineHeight="increased">{description}</S.Body>
            </div>
            <Link href={''}>
              <S.ReadMoreHeadline fontWeight="bold" size="medium" noMargin>
                Read more <BiRightArrowAlt />
              </S.ReadMoreHeadline>
            </Link>
          </S.Content>
        </Col>
      </Row>
    </Grid>
  );
};
