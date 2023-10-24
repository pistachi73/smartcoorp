'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BsJournalText } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import { Skeleton } from '@smartcoorp/ui/skeleton';
import { spaceXL } from '@smartcoorp/ui/tokens';

import { createPost } from '../actions/create-post';

import {
  Badge,
  BadgeContainer,
  NewPostCardContainer,
} from './post-card.styles';

type NewPostCardProps = {
  totalPosts?: number;
};

export const NewPostCard = ({ totalPosts }: NewPostCardProps) => {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  const createPostMutation = async () => {
    setLoading(true);
    const { data } = session;
    const { id } = data || {};

    const result = await createPost({ userId: id as string });

    if (result.error) {
      router.push('/login');
    }

    router.push(`/posts/${result.postId}`);

    setLoading(false);
  };

  const limitReached = Boolean(totalPosts && totalPosts >= 5);

  const headline = limitReached
    ? "You've Reached Your Post Limit"
    : 'Embark on a New Journey';
  const body = limitReached
    ? 'Upgrade to Premium to Write More Posts'
    : 'Craft, Share, and Publish Your Unique Stories – Write a New Post Today';

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
          {loading ? (
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
            disabled={loading}
            to="/posts"
          >
            Upgrade Now
          </Button>
        ) : null}
      </BadgeContainer>
    </NewPostCardContainer>
  );
};
