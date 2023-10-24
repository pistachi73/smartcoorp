import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';
import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceL } from '@smartcoorp/ui/tokens';
const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(nextAuthConfig);

  const posts = await prisma.ePost.findMany({
    where: {
      userId: session?.id?.toString() ?? '',
      ...(searchParams.title ? { title: searchParams.title } : {}),
    },
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Posts',
      href: '/posts',
    },
  ];

  return (
    <>
      <Breadcrumb
        homeUrl="/posts"
        breadcrumbs={breadcrumbs}
        style={{
          marginBottom: spaceL,
        }}
      />
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Overview
      </Headline>
      <Posts userId={(session as Session).id as string} initialPosts={posts} />
    </>
  );
};

export default PostsPage;
