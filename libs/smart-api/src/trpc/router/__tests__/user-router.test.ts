import { prismaMock } from '@smart-api/test/setup-prisma-mock';
import { adminSession, createCaller } from '@smart-api/test/setup-trpc';
import { TRPCError } from '@trpc/server';

import { mockUsers } from './__mocks__/user.mock';

describe('User Router', () => {
  describe('getAllUsers', () => {
    it('should return all users data', async () => {
      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      const caller = createCaller();

      const users = await caller.user.getAllUsers();

      expect(users).toStrictEqual(mockUsers);
      expect(users).toHaveLength(mockUsers.length);
    });
  });
  describe('getUserById', () => {
    it('should throw error of no auhtorized', async () => {
      const caller = createCaller();
      await expect(caller.user.getUserById(21)).rejects.toThrow(
        new TRPCError({
          code: 'UNAUTHORIZED',
          message: "You don't have permission to access this resource",
        })
      );
    });

    it("should return not found error if user doesn't exist", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.user.getUserById(21)).rejects.toThrow(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'User with id 21 not found',
        })
      );
    });
    it('should return user data', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const user = await caller.user.getUserById(1);

      const expectedResult = {
        username: mockUsers[0].username,
        email: mockUsers[0].email,
        role: mockUsers[0].role,
        profileImageUrl: mockUsers[0].profileImageUrl,
      };

      expect(user).toStrictEqual(expectedResult);
    });
  });

  describe('deleteUsers', () => {
    it('should throw error if no auhtorized', async () => {
      const caller = createCaller();

      await expect(caller.user.deleteUsers({ ids: [1] })).rejects.toThrow(
        new TRPCError({
          code: 'UNAUTHORIZED',
          message: "You don't have permission to access this resource",
        })
      );
    });

    it("should throw error if users doesn't exist", async () => {
      prismaMock.user.deleteMany.mockImplementation();
      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.user.deleteUsers({ ids: [1, 2] })).rejects.toThrow(
        new TRPCError({
          code: 'NOT_FOUND',
          message: 'Users with ids 1,2 not found',
        })
      );
    });

    it('should return deleted users count', async () => {
      prismaMock.user.deleteMany.mockResolvedValue({ count: 2 });

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const deletedUsers = await caller.user.deleteUsers({ ids: [1, 2] });

      expect(deletedUsers).toStrictEqual({ count: 2 });
    });
  });
  describe('createUser', () => {
    it('should throw error if no auhtorized', async () => {
      const caller = createCaller();

      await expect(caller.user.createUser(mockUsers[0])).rejects.toThrow(
        new TRPCError({
          code: 'UNAUTHORIZED',
          message: "You don't have permission to access this resource",
        })
      );
    });

    it('should throw error if user already exists', async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.user.createUser(mockUsers[0])).rejects.toThrow(
        new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        })
      );
    });

    it('should return created user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const createdUser = await caller.user.createUser(mockUsers[0]);

      expect(createdUser).toStrictEqual(mockUsers[0]);
    });
  });

  describe('updateUser', () => {
    it('should throw error if no auhtorized', async () => {
      const caller = createCaller();

      await expect(caller.user.deleteUsers({ ids: [1] })).rejects.toThrow(
        new TRPCError({
          code: 'UNAUTHORIZED',
          message: "You don't have permission to access this resource",
        })
      );
    });
    it('should throw error if user doesn"t exists', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      await expect(caller.user.updateUser(mockUsers[0])).rejects.toThrow(
        new TRPCError({
          code: 'BAD_REQUEST',
          message: "User doesn't already exists.",
        })
      );
    });

    it("should return updated user's data", async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);
      prismaMock.user.update.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        session: adminSession,
        prisma: prismaMock,
      });

      const updatedUser = await caller.user.updateUser(mockUsers[0]);

      expect(updatedUser).toStrictEqual(mockUsers[0]);
    });
  });
});
