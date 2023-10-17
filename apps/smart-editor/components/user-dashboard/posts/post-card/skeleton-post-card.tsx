import { EPostStatus } from '@prisma/client';
import { format } from 'date-fns';

import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import { spaceXS } from '@smartcoorp/ui/tokens';

import {
  PostCardContainer,
  PostCardContent,
  PostCardFooter,
  PostCardImage,
} from './post-card.styles';

export const SkeletonPostCard = () => {
  return (
    <PostCardContainer as="div" $isSkeleton>
      <Skeleton height="200px" width="100%" />
      <PostCardContent>
        <Skeleton height="14px" width="70%" />
        <Skeleton height="24px" width="90%" />
        <PostCardFooter>
          <Skeleton height="14px" width="70px" />
          <Skeleton height="14px" width="70px" />
        </PostCardFooter>
      </PostCardContent>
    </PostCardContainer>
  );
};
