import { EPost } from '@prisma/client';

export const mockPosts: EPost[] = [
  {
    id: '42ccd00e-f6e7-4d63-a072-3d3e90f53c0a',
    title: 'Post2',
    description: '',
    content: {
      blocks: {
        '0': {
          id: '0',
          data: {
            text: 'Write your blog',
            level: 3,
          },
          type: 'header',
          chainId: 'main',
        },
      },
      chains: {
        main: ['0'],
      },
    },
    wordCount: null,
    coverImageUrl: null,
    status: 'DRAFT',
    createdAt: new Date('2023-11-18T08:38:06.408Z'),
    updatedAt: new Date('2023-11-18T08:38:10.714Z'),
    userId: '206d3a98-6f5f-4375-9f32-2d7d6ce318c9',
  },
  {
    id: '7a8967cc-7b6b-4e0c-a187-df377b8eaf9d',
    title: 'Post3',
    description: '',
    content: {
      blocks: {
        '0': {
          id: '0',
          data: {
            text: 'Write your blog',
            level: 3,
          },
          type: 'header',
          chainId: 'main',
        },
      },
      chains: {
        main: ['0'],
      },
    },
    wordCount: null,
    coverImageUrl: null,
    status: 'DRAFT',
    createdAt: new Date('2023-11-18T08:38:14.326Z'),
    updatedAt: new Date('2023-11-18T08:38:17.711Z'),
    userId: '206d3a98-6f5f-4375-9f32-2d7d6ce318c9',
  },
  {
    id: '7cb5b559-9cfd-45bd-a190-87bc348dbf58',
    title: 'Post 1',
    description: '',
    content: {
      blocks: {
        '0': {
          id: '0',
          data: {
            text: 'Write your blog',
            level: 3,
          },
          type: 'header',
          chainId: 'main',
        },
      },
      chains: {
        main: ['0'],
      },
    },
    wordCount: null,
    coverImageUrl: null,
    status: 'DRAFT',
    createdAt: new Date('2023-11-18T07:41:25.250Z'),
    updatedAt: new Date('2023-11-18T08:37:59.101Z'),
    userId: '206d3a98-6f5f-4375-9f32-2d7d6ce318c9',
  },
];
