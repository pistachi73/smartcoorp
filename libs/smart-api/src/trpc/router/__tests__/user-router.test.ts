import { prismaMock } from '../../../utils/test/setup-prisma-mock';
import { createContextInner } from '../../context';
import { appRouter } from '../_app';

import { usersDataMock } from './__mocks__/users.mock';
describe('User Router', () => {
  describe('createUser', () => {
    it('should create a user', async () => {
      prismaMock.user.findMany.mockResolvedValue(usersDataMock);

      const ctx = createContextInner({ session: null, prisma: prismaMock });

      const caller = appRouter.createCaller(ctx);

      const users = await caller.user.getAllUsers();

      expect(users).toStrictEqual(usersDataMock);
      expect(users).toHaveLength(usersDataMock.length);
    });
  });
});
