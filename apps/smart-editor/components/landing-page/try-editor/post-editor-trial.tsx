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
      okwx0mlowz: {
        id: 'okwx0mlowz',
        chainId: 'main',
        type: 'header',
        data: {
          level: 3,
          text: 'Mastering the Art of Work-life Balance for Small Business Owners.',
        },
      },
      HyiXwLQOgd: {
        id: 'HyiXwLQOgd',
        chainId: 'main',
        type: 'header',
        data: {
          level: 4,
          text: 'Define Your Priorities',
        },
      },
      '5hw55LZamg': {
        id: '5hw55LZamg',
        chainId: 'main',
        type: 'paragraph',
        data: {
          text: 'One of the biggest challenges faced by small business owners is finding a balance between work and personal life. If you find yourself working long hours and struggling to keep up with personal responsibilities, it’s important to define your priorities.',
        },
      },
      TyniizAA9V: {
        id: 'TyniizAA9V',
        chainId: 'main',
        type: 'columns',
        data: {
          chains: ['TyniizAA9V-3RlPwH5IOB', 'TyniizAA9V-gkngNm9Qk3'],
          distribution: [2, 1],
        },
      },
      ugpsVOggTf: {
        id: 'ugpsVOggTf',
        chainId: 'TyniizAA9V-gkngNm9Qk3',
        type: 'paragraph',
        data: {
          text: 'In today’s digital age, technology plays a crucial role in maximizing productivity for small business owners.',
        },
      },
      okwx0mlo9p: {
        id: 'okwx0mlo9p',
        chainId: 'TyniizAA9V-3RlPwH5IOB',
        type: 'header',
        data: {
          level: 4,
          text: 'Schedule Buffer Time',
        },
      },
      '3HszdcLhWt': {
        id: '3HszdcLhWt',
        chainId: 'TyniizAA9V-3RlPwH5IOB',
        type: 'paragraph',
        data: {
          text: 'By allowing extra time between appointments and deadlines, as well as planning for emergencies, you can effectively manage unforeseen circumstances without sacrificing your personal time.',
        },
      },
      l0ux2p2RM8: {
        id: 'l0ux2p2RM8',
        chainId: 'main',
        type: 'paragraph',
        data: {
          text: 'Discover Tips and Tricks for Effectively Juggling the Demands of Business and Personal Life.',
        },
      },
      Go8AXyvXRj: {
        id: 'Go8AXyvXRj',
        chainId: 'TyniizAA9V-gkngNm9Qk3',
        type: 'header',
        data: {
          level: 4,
          text: 'Leverage the Power of Technology',
        },
      },
    },
    chains: {
      main: [
        'okwx0mlowz',
        'l0ux2p2RM8',
        'HyiXwLQOgd',
        '5hw55LZamg',
        'TyniizAA9V',
      ],
      'TyniizAA9V-3RlPwH5IOB': ['okwx0mlo9p', '3HszdcLhWt'],
      'TyniizAA9V-gkngNm9Qk3': ['Go8AXyvXRj', 'ugpsVOggTf'],
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
