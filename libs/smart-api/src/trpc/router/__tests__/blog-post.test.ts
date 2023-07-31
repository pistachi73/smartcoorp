import { mock } from 'node:test';

import { prismaMock } from '@smart-api/test/setup-prisma-mock';
import {
  adminSession,
  createCaller,
  expectErrorIfNoAuthroized,
} from '@smart-api/test/setup-trpc';
import { TRPCError } from '@trpc/server';

import { mockBlogPostAuthors } from './__mocks__/blog-post-author.mock';
import { mockBlogPosts } from './__mocks__/blog-post.mock';

describe('Blog Post Router', () => {
  describe('getById', () => {
    it("should throw error if post doesn't exist", async () => {
      prismaMock.blogPost.findUnique.mockResolvedValue(null);
      const caller = createCaller({
        prisma: prismaMock,
      });

      const blogPost = caller.blogPost.getById({ id: 1 });

      expect(blogPost).rejects.toThrowError(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      );
    });

    it('should return post', async () => {
      prismaMock.blogPost.findUnique.mockResolvedValue(mockBlogPosts[0]);

      const caller = createCaller({
        prisma: prismaMock,
      });

      const blogPost = await caller.blogPost.getById({ id: 1 });

      expect(blogPost).toStrictEqual(mockBlogPosts[0]);
    });
  });

  describe('delete', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(caller.blogPost.delete({ id: 1 }));
    });

    it('should throw error if post does not exist', () => {
      prismaMock.blogPost.delete.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPost = caller.blogPost.delete({ id: 1 });

      expect(blogPost).rejects.toThrowError(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      );
    });

    it('should return deleted post', async () => {
      prismaMock.blogPost.delete.mockResolvedValue(mockBlogPosts[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPost = await caller.blogPost.delete({ id: 1 });

      expect(blogPost).toStrictEqual(mockBlogPosts[0]);
    });
  });

  describe('deleteMany', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(caller.blogPost.deleteMany({ ids: [1] }));
    });
  });

  describe('update', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(caller.blogPost.deleteMany({ ids: [1] }));
    });

    it("should throw error if post doesn't exist", async () => {
      prismaMock.blogPost.update.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPost = caller.blogPost.update(mockBlogPosts[0]);

      expect(blogPost).rejects.toThrowError(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      );
    });
  });

  describe('create', () => {
    it('should throw error if not authorized', async () => {
      const caller = createCaller();
      expectErrorIfNoAuthroized(caller.blogPost.deleteMany({ ids: [1] }));
    });

    it("should trhow error if post content doesn't exist", async () => {
      const caller = createCaller({
        session: adminSession,
      });

      const res = caller.blogPost.create({
        ...mockBlogPosts[0],
        content: undefined,
      });

      expect(res).rejects.toThrowError(
        new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post content is required',
        })
      );
    });

    it('should throw error if author not found', async () => {
      prismaMock.blogPostAuthor.findUnique.mockResolvedValue(null);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const res = caller.blogPost.create(mockBlogPosts[0]);

      expect(res).rejects.toThrowError(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        })
      );
    });

    it("should throw error if an error happened while creating post's author", async () => {
      prismaMock.blogPostAuthor.findUnique.mockResolvedValue(
        mockBlogPostAuthors[0]
      );
      prismaMock.blogPost.create.mockImplementation();

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const res = caller.blogPost.create(mockBlogPosts[0]);

      expect(res).rejects.toThrowError(
        new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error happened while creating post',
        })
      );
    });

    it("should return created post's data", async () => {
      prismaMock.blogPostAuthor.findUnique.mockResolvedValue(
        mockBlogPostAuthors[0]
      );
      prismaMock.blogPost.create.mockResolvedValue(mockBlogPosts[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const blogPost = await caller.blogPost.create(mockBlogPosts[0]);

      expect(blogPost).toStrictEqual(mockBlogPosts[0]);
    });
  });
});
