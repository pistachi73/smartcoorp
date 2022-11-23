import { TRPCError } from '@trpc/server';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { appRouter } from '../../main';

type UserRegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

const user: UserRegisterInput = {
  email: 'test@test.com',
  password: 'test',
  firstName: 'test first name',
  lastName: 'test last name',
};

const caller = appRouter.createCaller({
  user: null,
  authorization: null,
});

describe('User', () => {
  describe('Register', () => {
    it('should register a user', async () => {
      const response = await caller.user.register(user);
      expect(response).toEqual({ token: expect.any(String) });
    });
    it('should not register a user with an existing email', async () => {
      const repeatedEmailUser = {
        ...user,
        firstName: 'Pepe',
        password: '1234',
      };

      await expect(caller.user.register(repeatedEmailUser)).rejects.toThrow(
        TRPCError
      );
    });

    it('should not register a user with an invalid email', async () => {
      const invalidEmailUser = {
        ...user,
        email: 'invalid email',
      };

      await expect(caller.user.register(invalidEmailUser)).rejects.toThrow(
        TRPCError
      );
    });

    it('should not register a user with an invalid password', async () => {
      const invalidPasswordUser = {
        ...user,
        password: '123',
      };

      await expect(caller.user.register(invalidPasswordUser)).rejects.toThrow(
        TRPCError
      );
    });
  });

  describe('Login', () => {
    it('should login a user', async () => {
      const response = await caller.user.login({
        email: user.email,
        password: user.password,
      });
      expect(response).toEqual({ token: expect.any(String) });
    });

    it('should not login a user with an invalid email', async () => {
      await expect(
        caller.user.login({
          email: 'invalid email',
          password: user.password,
        })
      ).rejects.toThrow(TRPCError);
    });

    it('should not login a user with an invalid password', async () => {
      await expect(
        caller.user.login({
          email: user.email,
          password: 'invalid password',
        })
      ).rejects.toThrow(TRPCError);
    });
  });
});
