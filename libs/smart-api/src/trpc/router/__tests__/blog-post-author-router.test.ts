import { prismaMock } from '@smart-api/test/setup-prisma-mock';
import {
  adminSession,
  createCaller,
  expectErrorIfNoAuthroized,
} from '@smart-api/test/setup-trpc';
import { TRPCError } from '@trpc/server';

import { mockBlogPostAuthors } from './__mocks__/blog-post-author.mock';
describe.only('Blog Post Author Router', () => {
  // NO NEED TO ADD TESTS FOR getAll

  describe('getById', () => {
    const caller = createCaller();
    it('should throw error if not authorized', async () => {
      expectErrorIfNoAuthroized(caller.blogPostAuthors.getById({ id: 1 }));
    });

    it("should return not found error if blog post author doesn't exist", async () => {
      prismaMock.blogPostAuthor.findUnique.mockResolvedValue(null);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.blogPostAuthors.getById({ id: 1 })).rejects.toThrow(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        })
      );
    });
    it('should return blog post author data', async () => {
      prismaMock.blogPostAuthor.findUnique.mockResolvedValue(
        mockBlogPostAuthors[0]
      );

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });
      const blogPostAuthor = await caller.blogPostAuthors.getById({ id: 1 });

      expect(blogPostAuthor).toStrictEqual(mockBlogPostAuthors[0]);
    });
  });

  describe('create', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(
        caller.blogPostAuthors.create(mockBlogPostAuthors[0])
      );
    });

    it("should return error if blog post author's is not created successfully", async () => {
      prismaMock.blogPostAuthor.create.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(
        caller.blogPostAuthors.create(mockBlogPostAuthors[0])
      ).rejects.toThrow(
        new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Author not created',
        })
      );
    });

    it('should return blog post author data', async () => {
      prismaMock.blogPostAuthor.create.mockResolvedValue(
        mockBlogPostAuthors[0]
      );

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPostAuthor = await caller.blogPostAuthors.create(
        mockBlogPostAuthors[0]
      );

      expect(blogPostAuthor).toStrictEqual(mockBlogPostAuthors[0]);
    });
  });

  describe('update', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(
        caller.blogPostAuthors.update(mockBlogPostAuthors[0])
      );
    });

    it("should return error if blog post author's is not found", async () => {
      prismaMock.blogPostAuthor.update.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(
        caller.blogPostAuthors.update(mockBlogPostAuthors[0])
      ).rejects.toThrow(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        })
      );
    });

    it('should return blog post author data', async () => {
      prismaMock.blogPostAuthor.update.mockResolvedValue(
        mockBlogPostAuthors[0]
      );

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPostAuthor = await caller.blogPostAuthors.update(
        mockBlogPostAuthors[0]
      );

      expect(blogPostAuthor).toStrictEqual(mockBlogPostAuthors[0]);
    });
  });

  describe('delete', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(caller.blogPostAuthors.delete({ id: 1 }));
    });

    it("should return error if blog post author's is not found", async () => {
      prismaMock.blogPostAuthor.delete.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.blogPostAuthors.delete({ id: 1 })).rejects.toThrow(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        })
      );
    });

    it('should return blog post author data', async () => {
      prismaMock.blogPostAuthor.delete.mockResolvedValue(
        mockBlogPostAuthors[0]
      );

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPostAuthor = await caller.blogPostAuthors.delete({ id: 1 });

      expect(blogPostAuthor).toStrictEqual(mockBlogPostAuthors[0]);
    });
  });

  describe('deleteMany', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(
        caller.blogPostAuthors.deleteMany({ ids: [1] })
      );
    });

    it('should return the number of blog post authors deleted', async () => {
      prismaMock.blogPostAuthor.deleteMany.mockResolvedValue({ count: 1 });

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPostAuthor = await caller.blogPostAuthors.deleteMany({
        ids: [1],
      });

      expect(blogPostAuthor).toStrictEqual({ count: 1 });
    });
  });
});
