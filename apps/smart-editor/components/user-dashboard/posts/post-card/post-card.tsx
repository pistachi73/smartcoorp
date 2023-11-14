'use client';
import { EPostStatus } from '@prisma/client';
import { fromContentToJSON } from '@smart-editor/utils/from-content-to-json';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  BsCloudDownload,
  BsGear,
  BsPen,
  BsThreeDotsVertical,
  BsTrash,
} from 'react-icons/bs';

import Image from 'next/image';
import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@smartcoorp/ui/dropdown-menu';
import { Headline } from '@smartcoorp/ui/headline';

import { DeletePostDialog } from '../delete-post-dialog';

import {
  PostCardContainer,
  PostCardContent,
  PostCardFooter,
  PostCardImage,
  PostCardOptionsButton,
  PostCardOptionsContent,
} from './post-card.styles';

export type PostCardProps = {
  id: string;
  title: string | null;
  wordCount: number | null;
  updatedAt?: string | Date;
  status?: EPostStatus;
  coverImageUrl: string | null;
  content: any;
};

export const statusMapping: Record<EPostStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
};

export const PostCard = ({
  id,
  title,
  wordCount,
  updatedAt,
  status,
  coverImageUrl,
  content,
}: PostCardProps) => {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState(false);

  return (
    <>
      <PostCardContainer $isSkeleton={false}>
        <DropdownMenu
          onOpenChange={setIsOptionsDropdownOpen}
          open={isOptionsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <PostCardOptionsButton
              size="small"
              color="primary"
              variant="secondary"
              icon={BsThreeDotsVertical}
            />
          </DropdownMenuTrigger>
          <PostCardOptionsContent align="start" sideOffset={4}>
            <DropdownMenuItem>
              <Button
                to={`/posts/${id}/edit`}
                size="small"
                variant="text"
                icon={BsPen}
              >
                Edit post
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                to={`/posts/${id}`}
                size="small"
                variant="text"
                icon={BsGear}
              >
                Post settings
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteDialogOpen(true);
                setIsOptionsDropdownOpen(false);
              }}
            >
              <Button size="small" variant="text" icon={BsTrash}>
                Delete
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={!title || !content}>
              <Button
                size="small"
                variant="text"
                icon={BsCloudDownload}
                onClick={() => {
                  fromContentToJSON({
                    title,
                    content,
                  });
                  setIsOptionsDropdownOpen(false);
                }}
              >
                Export JSON
              </Button>
            </DropdownMenuItem>
          </PostCardOptionsContent>
        </DropdownMenu>
        <PostCardImage>
          <Image
            data-testid="post-card-image"
            src={coverImageUrl ?? '/dashboard/cover-image-placeholder.webp'}
            alt={`${title} Cover Image`}
            fill
            sizes="600px"
            priority
          />
        </PostCardImage>
        <PostCardContent>
          <div>
            <Body size="small" variant="neutral" noMargin>
              Last updated:{' '}
              {updatedAt
                ? format(new Date(updatedAt), 'PPP')
                : 'Waiting for updates'}
            </Body>
            <Link href={`/posts/${id}`}>
              <Headline as="h2" size="large" noMargin>
                {title}
              </Headline>
            </Link>
          </div>

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
      <DeletePostDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        postId={id}
        coverImageUrl={coverImageUrl}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['getPosts'] });
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
};
