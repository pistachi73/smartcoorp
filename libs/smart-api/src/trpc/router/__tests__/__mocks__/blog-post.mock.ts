import { BlogPost } from '@prisma/client';

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    published: true,
    title: 'Test Post',
    description: 'Test Description',
    authorId: 1,
    readTime: 1,
    content: 'Test Content',
    portraitImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    published: true,
    title: 'Test Post',
    description: 'Test Description',
    authorId: 2,
    readTime: 2,
    content: 'Test Content',
    portraitImageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
