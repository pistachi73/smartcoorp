'use client';
import { EPostStatus } from '@prisma/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  BsCloudDownload,
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

type PostCardProps = {
  id: string;
  title: string | null;
  wordCount: number | null;
  updatedAt?: string | Date;
  status?: EPostStatus;
  coverImageUrl: string | null;
  content: any;
};

const statusMapping: Record<EPostStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
};

const toKebabCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-');

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

  const createJSONContent = () => {
    if (!title || !content) return;

    const file = new File(
      ['\ufeff' + JSON.stringify(content)],
      `${toKebabCase(title)}.json`,
      {
        type: 'text/json;charset=utf-8',
      }
    );
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
                to={`/posts/${id}`}
                size="small"
                variant="text"
                icon={BsPen}
              >
                Edit
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
                  createJSONContent();
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
            src={coverImageUrl ?? '/dashboard/cover-image-placeholder.webp'}
            alt={`${title} Cover Image`}
            fill
            sizes="600px"
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
