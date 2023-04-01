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

import { noDocs } from '../../helpers';

import { BlocksDB } from './contexts/blocks-context';
import { PostEditor as PostEditorComponent } from './post-editor';

export default {
  title: 'Editor/PostEditor',
  component: PostEditorComponent,

  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Post Editor</Title>
          <Subtitle>Post Editor component for SC projects</Subtitle>
          <Description>##Overview</Description>
          <Description>
            Basic `PostEditor` component to perform blog post editing.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { PostEditor } from '@smartcoorp/smart-design';`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
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
    setBlocksDB: () => {},
    getMetaData: () => {},
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

export const PostEditorCypress = {
  render: Template,

  args: {
    setBlocksDB: () => {},
    getMetaData: () => {},
    blocksDB: blocksDBMock,
  },
};

export const blocksDBMock: BlocksDB = {
  blocks: {
    mainHeader: {
      id: 'mainHeader',
      chainId: 'main',
      type: 'header',
      data: {
        level: 2,
        text: 'How to Start a Blog and Monetize it in 2023',
      },
    },

    paragraph1: {
      id: 'paragraph1',
      chainId: 'main',
      type: 'paragraph',
      data: {
        text: 'If you’re wondering how to create a blog, you’ve come to the right place. As a blogger myself, I can tell you it’s a rewarding way to hone your writing skills, explore new ideas, and build an online presence that revolves around your passions and expertise. You’ll get the chance to inspire, educate, and entertain your readers - and as your blog grows, you can even start making money and turn it into a full-time job.',
      },
    },
    paragraph2: {
      id: 'paragraph2',
      chainId: 'main',
      type: 'paragraph',
      data: {
        text: 'In other words, blogging is the first step toward finally pursuing your dream job or favorite hobby, so you really can’t go wrong. While starting a blog might seem daunting, I’m going to walk you through every step to make it as smooth as possible. The process is actually quite easy, and you’ll have your blog up and running before you know it.',
      },
    },

    subHeader: {
      id: 'subHeader',
      chainId: 'main',
      type: 'header',
      data: {
        level: 3,
        text: 'How to start a blog',
      },
    },
    orderedList: {
      id: 'orderedList',
      chainId: 'main',
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          'Choose a blogging platform. Use a platform that offers customizable templates.',
          'Pick a hosting platform. Consider a platform with good bandwidth, uptime and customer support.',
          'Find the right niche. Narrow down your theme and have a specific audience in mind.',
        ],
      },
    },
    emptyLink: {
      id: 'emptyLink',
      chainId: 'main',
      type: 'link',
      data: {},
    },
    filledLink: {
      id: 'filledLink',
      chainId: 'main',
      type: 'link',
      data: {
        link: 'https://www.google.com',
        description: 'Google',
        domain: 'google.com',
        imageUrl:
          'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        title: 'Google',
        url: 'https://www.google.com',
      },
    },
    image: {
      id: 'image',
      chainId: 'main',
      type: 'image',
      data: {},
    },
    // '7': {
    //   id: '7',
    //   chainId: 'main',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 7',
    //   },
    // },
    // '8': {
    //   id: '8',
    //   chainId: 'main',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 8',
    //   },
    // },
    // '10': {
    //   id: '10',
    //   chainId: 'twocolumn-chain2',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 10',
    //   },
    // },
    // '11': {
    //   id: '11',
    //   chainId: 'main',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 11',
    //   },
    // },
    // '15': {
    //   id: '15',
    //   chainId: 'main',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 15',
    //   },
    // },
    // '16': {
    //   id: '16',
    //   chainId: 'main',
    //   type: 'paragraph',
    //   data: {
    //     text: 'Paragraph with id 16',
    //   },
    // },
    // twocolumn: {
    //   id: 'twocolumn',
    //   chainId: 'main',
    //   type: 'columns',
    //   data: {
    //     chains: ['twocolumn-chain1', 'twocolumn-chain2'],
    //   },
    // },
    // anothertwocolumn: {
    //   id: 'anothertwocolumn',
    //   chainId: 'twocolumn-chain1',
    //   type: 'columns',
    //   data: {
    //     chains: ['anothertwocolumn-chain3', 'anothertwocolumn-chain4'],
    //   },
    // },

    // ...randomBlocks,
  },
  chains: {
    main: [
      'mainHeader',
      'paragraph1',
      'paragraph2',
      'subHeader',
      'orderedList',
      'emptyLink',
      'filledLink',
      'image',
    ],
  },
};
