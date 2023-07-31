const mockCompare = jest.fn();

import { Role } from '@prisma/client';
import { prismaMock } from '@smart-api/test/setup-prisma-mock';

import { mockUsers } from '../../trpc/router/__tests__/__mocks__/user.mock';
import { authorize } from '../next-auth-configuration';

jest.mock('../../trpc/router/auth.router', () => ({
  loginSchema: {
    parseAsync: jest.fn().mockImplementation((credentials) => ({
      email: credentials.email,
      password: credentials.password,
    })),
  },
}));

jest.mock('bcrypt', () => ({
  compare: mockCompare,
}));

describe.only('NextAuthConfiguration', () => {
  describe('Authorize function', () => {
    it('should return null if user is not found', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      const res = await authorize({
        email: 'email@email.com',
        password: 'password',
      });

      expect(res).toEqual(null);
    });

    it("should return null if user's password is invalid", async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);

      mockCompare.mockResolvedValue(false);
      const res = await authorize({
        email: 'email@email.com',
        password: 'password',
      });

      expect(res).toEqual(null);
    });

    it('should return user info', async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUsers[0]);

      mockCompare.mockResolvedValue(true);

      const res = await authorize({
        email: 'email@email.com',
        password: 'password',
      });

      const expectedResult = {
        id: mockUsers[0].id,
        email: mockUsers[0].email,
        username: mockUsers[0].username,
        role: mockUsers[0].role,
        profileImageUrl: mockUsers[0].profileImageUrl,
      };
      expect(res).toStrictEqual(expectedResult);
    });

    it("should return null if user's role is not correct", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
        ...mockUsers[0],
        role: Role.USER,
      });
      mockCompare.mockResolvedValue(true);

      const res = await authorize(
        {
          email: mockUsers[0].email,
          password: 'password',
        },
        Role.ADMIN
      );

      expect(res).toEqual(null);
    });
  });
});
