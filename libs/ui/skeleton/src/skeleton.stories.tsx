import { Meta, StoryFn } from '@storybook/react';

import { TemplateProps } from '@smartcoorp/ui/shared';

import { Skeleton } from './skeleton';
import { SkeletonProps } from './skeleton.types';
export default {
  title: 'Component/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'A Skeleton component, also known as a placeholder or shimmer component, is a user interface element designed to provide a temporary visual representation of content while data is being fetched or loaded from a remote source. It aims to improve the user experience by reducing perceived loading times and providing visual feedback that indicates that content is being prepared.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<SkeletonProps>;

const Template: StoryFn<SkeletonProps> = (args: SkeletonProps) => {
  return <Skeleton {...args}></Skeleton>;
};

export const Default: TemplateProps<SkeletonProps> = {
  render: Template,
  args: {
    width: '100%',
    height: '20px',
  },
};

export const WithNumber: TemplateProps<SkeletonProps> = {
  render: Template,
  args: {
    number: 3,
    width: '100%',
    height: '20px',
  },
};
