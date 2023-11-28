'use client';

import { getMetadata } from '@smart-editor/actions/get-metadata';
import { useReducer, useState } from 'react';

import { Button } from '@smartcoorp/ui/button';
import {
  PostEditor,
  RenderBlocksJSON,
  blocksDBReducer,
} from '@smartcoorp/ui/post-editor';

import {
  PostEditorAndRenderContainer,
  PostEditorContainer,
  RenderBlockJSONContainer,
  RenderBlocksContainer,
  RenderBlocksToolbarContainer,
} from './try-editor.styles';

export const PostEditorTrial = () => {
  const [blocksDB, dispatchBlocksDB] = useReducer(blocksDBReducer, {
    blocks: {
      ZV3bJ: {
        id: 'ZV3bJ',
        chainId: 'main',
        type: 'header',
        data: {
          level: 3,
          text: 'Mastering the Art of Work-life Balance for Small Business Owners.',
        },
      },
      BycfG: {
        id: 'BycfG',
        chainId: 'main',
        type: 'header',
        data: {
          level: 4,
          text: 'Define Your Priorities',
        },
      },
      OuoRj: {
        id: 'OuoRj',
        chainId: 'main',
        type: 'paragraph',
        data: {
          text: 'One of the biggest challenges faced by small business owners is finding a balance between work and personal life. If you find yourself working long hours and struggling to keep up with personal responsibilities, it’s important to define your priorities.',
        },
      },
      '8bqJ5': {
        id: '8bqJ5',
        chainId: 'main',
        type: 'columns',
        data: {
          chains: ['8bqJ5-3RlPwH5IOB', '8bqJ5-gkngNm9Qk3'],
          distribution: [2, 1],
        },
      },
      vwu4r: {
        id: 'vwu4r',
        chainId: '8bqJ5-gkngNm9Qk3',
        type: 'paragraph',
        data: {
          text: 'In today’s digital age, technology plays a crucial role in maximizing productivity for small business owners.',
        },
      },
      eg6Hr: {
        id: 'eg6Hr',
        chainId: '8bqJ5-3RlPwH5IOB',
        type: 'header',
        data: {
          level: 4,
          text: 'Schedule Buffer Time',
        },
      },
      p34VJ: {
        id: 'p34VJ',
        chainId: '8bqJ5-3RlPwH5IOB',
        type: 'paragraph',
        data: {
          text: 'By allowing extra time between appointments and deadlines, as well as planning for emergencies, you can effectively manage unforeseen circumstances without sacrificing your personal time.',
        },
      },
      '2BabJ': {
        id: '2BabJ',
        chainId: 'main',
        type: 'paragraph',
        data: {
          text: 'Discover Tips and Tricks for Effectively Juggling the Demands of Business and Personal Life.',
        },
      },
      meyNg: {
        id: 'meyNg',
        chainId: '8bqJ5-gkngNm9Qk3',
        type: 'header',
        data: {
          level: 4,
          text: 'Leverage the Power of Technology',
        },
      },
      qcG3Z: {
        id: 'qcG3Z',
        chainId: 'main',
        type: 'link',
        data: {
          link: 'smarteditor.app',
          description:
            'SmartEditor is a powerful tool that allows you to effortlessly write and organize content, and then export it as JSON.',
          domain: 'smarteditor.app',
          imageUrl: 'https://smarteditor.app/og_image.png',
          title: 'SmartEditor - Transition from words to JSON-powered content.',
          url: 'https://smarteditor.app/',
        },
      },
    },
    chains: {
      main: ['ZV3bJ', '2BabJ', 'qcG3Z', 'BycfG', 'OuoRj', '8bqJ5'],
      '8bqJ5-3RlPwH5IOB': ['eg6Hr', 'p34VJ'],
      '8bqJ5-gkngNm9Qk3': ['meyNg', 'vwu4r'],
    },
    canRedo: false,
    canUndo: false,
  });

  const [dataRendered, setDataRendered] = useState<'blocks' | 'chains'>(
    'blocks'
  );

  return (
    <>
      <PostEditorAndRenderContainer>
        <PostEditorContainer>
          <PostEditor
            blocksDB={blocksDB}
            dispatchBlocksDB={dispatchBlocksDB}
            getMetaData={getMetadata}
            maxImages={2}
          />
        </PostEditorContainer>

        <RenderBlocksContainer>
          <RenderBlocksToolbarContainer>
            <Button
              size="small"
              variant="text"
              onClick={() => setDataRendered('blocks')}
            >
              View Blocks Data
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => setDataRendered('chains')}
            >
              View Chains Data
            </Button>
          </RenderBlocksToolbarContainer>
          <RenderBlockJSONContainer>
            <RenderBlocksJSON
              obj={
                dataRendered === 'blocks'
                  ? { blocks: blocksDB.blocks }
                  : { chains: blocksDB.chains }
              }
            />
          </RenderBlockJSONContainer>
        </RenderBlocksContainer>
      </PostEditorAndRenderContainer>
    </>
  );
};
