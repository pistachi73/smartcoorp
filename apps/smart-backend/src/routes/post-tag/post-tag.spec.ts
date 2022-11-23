/* eslint-disable @typescript-eslint/no-empty-interface */
import { appRouter } from '../../main';
import { InferMutationInput } from '../../utils/trpc';

interface CreateContextOptions {
  // session: Session | null
}
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

describe('PostTag', () => {
  it('should be able to create a post tag', async () => {
    const caller = appRouter.createCaller({
      user: null,
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmYyNDU5Mjg3OWViOTk2Yjc2MmNmYyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiZmlyc3RfbmFtZSI6Ik9zY2FyIiwibGFzdF9uYW1lIjoiUHVsaWRvIiwiaWF0IjoxNjY3MzA2ODYxLCJleHAiOjE2Njc0Nzk2NjF9.uOfzCsbcWMxGoJPKOJvcb5s7uKZGOH3sOkYm5I8A4v0',
    });

    const result = await caller.postTag.add({ name: 'test', color: '#000000' });

    const tags = await caller.postTag.getAll();
    console.log(tags);
  });
});
