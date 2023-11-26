'use client';

import { BsJournalText } from 'react-icons/bs';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import { Skeleton } from '@smartcoorp/ui/skeleton';

import { useCreatePost } from '../posts.hooks';

import {
  Badge,
  BadgeContainer,
  NewPostCardContainer,
} from './post-card.styles';

type NewPostCardProps = {
  totalPosts?: number;
};

export const NewPostCard = ({ totalPosts }: NewPostCardProps) => {
  const { mutate: createPost, isLoading } = useCreatePost();

  const createPostMutation = async () => {
    await createPost();
  };

  const limitReached = Boolean(totalPosts && totalPosts >= 5);

  const headline = limitReached
    ? "You've reached your post limit"
    : 'Embark on a new journey';
  const body = limitReached
    ? 'Upgrade to premium to write more posts'
    : 'Craft, share, and sublish your unique stories – Write a new post today';

  return (
    <NewPostCardContainer
      as="button"
      onClick={createPostMutation}
      disabled={limitReached}
      $limitReach={limitReached}
    >
      <Headline size="medium">{headline}</Headline>
      <Body variant="neutral" size="small">
        {body}
      </Body>

      <BadgeContainer>
        <Badge>
          {isLoading ? (
            <DotLoading size="small" />
          ) : (
            <>
              <BsJournalText size={16} />
              {typeof totalPosts !== 'undefined' ? (
                <Body size="small" as="span" noMargin>
                  {totalPosts} / 5
                </Body>
              ) : (
                <Skeleton height="21px" width="30px" />
              )}
            </>
          )}
        </Badge>

        {totalPosts && totalPosts >= 5 ? (
          <Button
            size="medium"
            variant="primary"
            disabled={isLoading}
            to="/posts"
          >
            Upgrade Now
          </Button>
        ) : null}
      </BadgeContainer>
    </NewPostCardContainer>
  );
};
