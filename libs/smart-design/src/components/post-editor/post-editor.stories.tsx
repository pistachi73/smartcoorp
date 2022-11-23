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

import { PostEditor as PostEditorComponent } from './post-editor';
import { Block } from './post-editor.types';

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
  const [blocks, setBlocks] = React.useState<Block[]>([
    {
      id: 'check',
      type: 'paragraph',
      data: {
        text: 'Test paragraph',
      },
    },
    {
      id: 'header',
      type: 'header',
      data: {
        level: 3,
        text: 'Hello world',
      },
    },
    {
      id: 'header 2',
      type: 'header',
      data: {
        level: 6,
        text: 'Hello world2',
      },
    },

    {
      id: 'paragraph',
      type: 'paragraph',
      data: {
        text: '<i>Testing</i> <b>post <i>editor</i> paragraph</b> line break',
      },
    },
    // {
    //   id: 'unordered',
    //   type: 'list',
    //   data: {
    //     style: 'unordered',
    //     items: ['k-styled editors'],
    //   },
    // },
    {
      id: 'ordered',
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          'k-styled editors',
          'It returns <b>clean data output</b> in JSON',
          'Designed to be extendable andss pluggable with a simple API',
        ],
      },
    },
    {
      id: '5',
      type: 'link',
      data: {},
    },
    {
      id: '6',
      type: 'image',
      data: {},
    },
  ]);

  return (
    <PostEditorComponent
      blocks={blocks}
      setBlocks={setBlocks}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getMetaData={() => {}}
    />
  );
};

export const PostEditor = Template.bind({});
