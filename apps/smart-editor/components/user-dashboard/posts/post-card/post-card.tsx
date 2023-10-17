import { EPostStatus } from '@prisma/client';
import { format } from 'date-fns';

import Image from 'next/image';
import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS } from '@smartcoorp/ui/tokens';

import {
  PostCardContainer,
  PostCardContent,
  PostCardFooter,
  PostCardImage,
} from './post-card.styles';

type PostCardProps = {
  id: number;
  title: string | null;
  wordCount: number | null;
  updatedAt?: Date;
  status?: EPostStatus;
  coverImageUrl: string | null;
};

const statusMapping: Record<EPostStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
};

export const PostCard = ({
  id = 1234,
  title,
  wordCount,
  updatedAt,
  status,
  coverImageUrl,
}: PostCardProps) => {
  return (
    <PostCardContainer as={Link} href={`/posts/${id}`} $isSkeleton={false}>
      <PostCardImage>
        <Image
          src={coverImageUrl ?? '/dashboard/cover-image-placeholder.webp'}
          alt={`${title} Cover Image`}
          fill
        />
      </PostCardImage>
      <PostCardContent>
        <Body
          size="small"
          variant="neutral"
          style={{
            marginBottom: spaceXS,
          }}
        >
          Last updated:{' '}
          {updatedAt ? format(updatedAt, 'PPP') : 'Waiting for updates'}
        </Body>
        <Headline size="large" as="h2">
          {title ?? 'Begin Your Journey: A Blank Canvas'}
        </Headline>
        <PostCardFooter>
          <Body size="small" variant="neutral" noMargin>
            <span>Status: </span>
            {status ? statusMapping[status] : 'No status'}
          </Body>
          <Body size="small" variant="neutral" noMargin>
            <span>Word count: </span>
            {wordCount ?? 0}
          </Body>
        </PostCardFooter>
      </PostCardContent>
    </PostCardContainer>
  );
};
