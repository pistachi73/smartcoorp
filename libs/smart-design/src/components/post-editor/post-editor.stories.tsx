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
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import type {
  BlockDataDB,
  BlocksDB,
} from './contexts/blocks-db-context/blocks-db.types';
import { PostEditor as PostEditorComponent } from './post-editor';

export default {
  title: 'Component/PostEditor',
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
          import styled from 'styled-components';
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
  },
  argTypes: {},
} as ComponentMeta<typeof PostEditorComponent>;

const Template: ComponentStory<typeof PostEditorComponent> = () => {
  // const randomBlocks: BlockDataDB = {};
  // Array.from(
  //   { length: 100 },
  //   (_, i) =>
  //     (randomBlocks[i + 200] = {
  //       id: `${i + 200}`,
  //       type: 'paragraph',
  //       data: {
  //         text: `Paragraph with Index ${i + 200}`,
  //       },
  //     })
  // );

  const [blocksDB, setBlocksDB] = React.useState<BlocksDB>({
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
        chainId: 'chain1',
        type: 'paragraph',
        data: {
          text: 'Paragrapoh with Index 2',
        },
      },

      '3': {
        id: '3',
        chainId: 'chain3',
        type: 'list',
        data: {
          style: 'unordered',
          items: ['Unordered list Index 3'],
        },
      },
      '4': {
        id: '4',
        chainId: 'chain4',
        type: 'list',
        data: {
          style: 'ordered',
          items: ['Ordered list Index 4'],
        },
      },
      '5': {
        id: '5',
        chainId: 'chain2',
        type: 'link',
        data: {},
      },
      '6': {
        id: '6',
        chainId: 'chain2',
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
        chainId: 'chain2',
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
      'two-column': {
        id: 'two-column',
        chainId: 'main',
        type: 'two-column',
        data: {
          chains: ['chain1', 'chain2'],
        },
      },
      'another-two-column': {
        id: 'another-two-column',
        chainId: 'chain1',
        type: 'two-column',
        data: {
          chains: ['chain3', 'chain4'],
        },
      },

      // ...randomBlocks,
    },
    chains: {
      main: ['0', '11', 'two-column', '7', '8'],
      chain1: ['2', 'another-two-column'],
      chain2: ['5', '6', '10'],
      chain3: ['3'],
      chain4: ['4'],
    },
  });

  return (
    <PostEditorComponent
      blocksDB={blocksDB}
      setBlocksDB={setBlocksDB}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getMetaData={() => {}}
    />
  );
};

export const PostEditor = Template.bind({});
