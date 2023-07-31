import { prismaMock } from '@smart-api/test/setup-prisma-mock';
import { createCaller } from '@smart-api/test/setup-trpc';
import { TRPCError } from '@trpc/server';

import { type ISignUp } from '../auth.router';

import { mockUsers } from './__mocks__/user.mock';

const mockSignupUser: ISignUp = {
  username: 'test',
  email: 'email@email.com',
  password: 'test',
};

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('Auth Router', () => {
  describe('signUp', () => {
    it('should throw error if user email already exists', async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        prisma: prismaMock,
      });

      await expect(caller.auth.signUp(mockSignupUser)).rejects.toThrow(
        new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        })
      );
    });

    it('sould signUp user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUsers[0]);

      const caller = createCaller({
        prisma: prismaMock,
      });

      const result = await caller.auth.signUp(mockSignupUser);

      expect(prismaMock.user.create).toBeCalledWith({
        data: {
          username: mockSignupUser.username,
          email: mockSignupUser.email,
          password: 'hashedPassword',
        },
      });

      expect(result).toStrictEqual({
        status: 201,
        message: 'Account created successfully',
        result: mockUsers[0].email,
      });
    });
  });
});
