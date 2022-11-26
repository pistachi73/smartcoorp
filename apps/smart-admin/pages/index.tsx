import { url } from 'inspector';

import axios from 'axios';
import React from 'react';
import { v4 as uuid } from 'uuid';

import {
  Block,
  Button,
  ImageBlockProps,
  PostEditor,
} from '@smartcoorp/smart-design';

import { trpc } from '../utils/trpc';

export function Index() {
  const util = trpc.useContext();
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });
  //  const query = (text: string) => util.metadata.get.fetch(text);

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

  // const { mutateAsync: createPresignedUrl } =
  //   trpc.media.createPresignedUrl.useMutation();

  // const uploadImage = async () => {
  //   const imageBlocks = blocks.filter(
  //     ({ type }) => type === 'image'
  //   ) as ImageBlockProps[];

  //   for (const imageBlock of imageBlocks) {
  //     console.log(imageBlock);
  //     if (!imageBlock.data.file) continue;

  //     console.log('hola');
  //     const id = uuid();
  //     const ext = imageBlock.data.file.type.split('/')[1];

  //     const { url, fields } = await createPresignedUrl({
  //       id,
  //       ext,
  //     });

  //     const data = {
  //       ...fields,
  //       'Content-Type': imageBlock.data.file.type,
  //       file: imageBlock.data.file,
  //     };

  //     const formData = new FormData();
  //     for (const name in data) {
  //       formData.append(name, data[name as keyof typeof data]);
  //     }

  //     await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     console.log('perfect');
  //   }
  // };

  return (
    <>
      {/* <Button onClick={uploadImage}>Upload Image</Button> */}
      <PostEditor blocks={blocks} setBlocks={setBlocks} />
    </>
  );
}

export default Index;
