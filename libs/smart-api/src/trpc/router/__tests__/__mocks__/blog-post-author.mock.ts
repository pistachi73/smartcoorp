import { BlogPostAuthor } from '@prisma/client';

export const mockBlogPostAuthors: BlogPostAuthor[] = [
  {
    id: 1,
    bio: 'bio1',
    name: 'name1',
    website: 'website1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    bio: 'bio2',
    name: 'name2',
    website: 'website2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
