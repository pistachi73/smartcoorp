'use client';

import { set } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BsJournalText } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';

import { createPost } from '../actions/create-post';

import { Badge, NewPostCardContainer } from './post-card.styles';

export const NewPostCard = () => {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  const createPostMutation = async () => {
    setLoading(true);
    const { data } = session;
    const { id } = data || {};

    if (!id) {
      router.push('/login');
    }

    const result = await createPost(id as number);

    if (result.error) {
      router.push('/login');
    }

    router.push(`/posts/${result.postId}`);

    setLoading(false);
  };

  return (
    <NewPostCardContainer as="button" onClick={createPostMutation}>
      <Headline size="medium">Embark on a New Journey</Headline>
      <Body variant="neutral" size="small">
        Craft, Share, and Publish Your Unique Stories – Write a New Post Today
      </Body>

      <Badge>
        {loading ? (
          <DotLoading disabled size="medium" />
        ) : (
          <>
            <BsJournalText size={16} />
            <Body size="small" as="span" noMargin>
              3 / 5
            </Body>
          </>
        )}
      </Badge>
    </NewPostCardContainer>
  );
};
