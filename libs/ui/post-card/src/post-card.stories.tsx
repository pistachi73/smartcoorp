import { Meta } from '@storybook/react';

import { TemplateProps } from '@smartcoorp/ui/shared';

import { PostCard } from './post-card';
import { PostCardProps } from './post-card.types';

export default {
  title: 'Post/Post Card/Post Card',
  component: PostCard,
  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Post component is used for rendering blog posts edited with the blog post editor component',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<PostCardProps>;

export const Default: TemplateProps<PostCardProps> = {
  args: {
    title: 'How to build intuitive websites',
    description:
      'Your blog post design says a lot about your brand, and can have a crucial impact on your readers. In this article, we’ll give you inspirational ideas to improve the look and feel of your WordPress blog posts.',
    readingTime: 5,
    updatedAt: new Date(),
  },

  parameters: {},
};
export const SkeletonCard: TemplateProps<PostCardProps> = {
  args: {},

  parameters: {},
};
