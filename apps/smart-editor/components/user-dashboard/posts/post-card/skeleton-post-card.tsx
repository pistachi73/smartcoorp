import { Skeleton } from '@smartcoorp/ui/skeleton';

import {
  PostCardContainer,
  PostCardContent,
  PostCardFooter,
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
