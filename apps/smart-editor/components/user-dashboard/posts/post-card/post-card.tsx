import { EPostStatus } from '@prisma/client';
import { format } from 'date-fns';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS } from '@smartcoorp/ui/tokens';

import { DeletePostDialog } from '../delete-post-dialog';

import {
  PostCardContainer,
  PostCardContent,
  PostCardFooter,
  PostCardImage,
  Toolbar,
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
    <PostCardContainer>
      <Toolbar>
        <Link href={`/posts/${id}`}>
          <Body size="small" noMargin>
            Edit
          </Body>
          <BsPencilSquare size={16} />
        </Link>
        <DeletePostDialog
          postId={id}
          trigger={
            <button>
              <Body size="small" noMargin>
                Delete
              </Body>
              <BsTrash size={16} />
            </button>
          }
        />
      </Toolbar>
      <PostCardImage>
        <img
          src={coverImageUrl ?? '/dashboard/cover-image-placeholder.webp'}
          alt={`${title} Cover Image`}
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
