import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { Meta, StoryFn } from '@storybook/react';

import { PostEditor as PostEditorComponent } from './post-editor';

export default {
  title: 'Post/Editor',
  component: PostEditorComponent,

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component: 'Basic `PostEditor` component to perform blog post editing.',
      },
    },
  },

  argTypes: {},
} as Meta<typeof PostEditorComponent>;

const Template: StoryFn<typeof PostEditorComponent> = (args) => {
  return <PostEditorComponent {...args} />;
};

export const PostEditor = {
  render: Template,

  args: {
    setBlocksDB: () => {
      console.log('setBlocksDB');
    },
    getMetaData: () => {
      console.log('getMetaData');
    },
    blocksDB: {
      blocks: {
        '0': {
          id: '0',
          chainId: 'main',
          type: 'header',
          data: {
            level: 3,
            text: 'Header with Index 0',
          },
        },

        '2': {
          id: '2',
          chainId: 'twocolumn-chain1',
          type: 'paragraph',
          data: {
            text: 'Paragrapoh with Index 2',
          },
        },

        '3': {
          id: '3',
          chainId: 'anothertwocolumn-chain3',
          type: 'list',
          data: {
            style: 'unordered',
            items: ['Unordered list Index 3'],
          },
        },
        '4': {
          id: '4',
          chainId: 'anothertwocolumn-chain4',
          type: 'list',
          data: {
            style: 'ordered',
            items: ['Ordered list Index 4'],
          },
        },
        '5': {
          id: '5',
          chainId: 'twocolumn-chain2',
          type: 'link',
          data: {},
        },
        '6': {
          id: '6',
          chainId: 'twocolumn-chain2',
          type: 'image',
          data: {},
        },
        '7': {
          id: '7',
          chainId: 'main',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 7',
          },
        },
        '8': {
          id: '8',
          chainId: 'main',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 8',
          },
        },
        '10': {
          id: '10',
          chainId: 'twocolumn-chain2',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 10',
          },
        },
        '11': {
          id: '11',
          chainId: 'main',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 11',
          },
        },
        '15': {
          id: '15',
          chainId: 'main',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 15',
          },
        },
        '16': {
          id: '16',
          chainId: 'main',
          type: 'paragraph',
          data: {
            text: 'Paragraph with id 16',
          },
        },
        twocolumn: {
          id: 'twocolumn',
          chainId: 'main',
          type: 'columns',
          data: {
            chains: ['twocolumn-chain1', 'twocolumn-chain2'],
          },
        },
        anothertwocolumn: {
          id: 'anothertwocolumn',
          chainId: 'twocolumn-chain1',
          type: 'columns',
          data: {
            chains: ['anothertwocolumn-chain3', 'anothertwocolumn-chain4'],
          },
        },

        // ...randomBlocks,
      },
      chains: {
        main: ['0', '11', '15', '16', 'twocolumn', '7', '8'],
        'twocolumn-chain1': ['2', 'anothertwocolumn'],
        'twocolumn-chain2': ['5', '6', '10'],
        'anothertwocolumn-chain3': ['3'],
        'anothertwocolumn-chain4': ['4'],
      },
    },
  },
};
