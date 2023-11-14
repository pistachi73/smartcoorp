import { EApiKey } from '@prisma/client';

export const mockApiKeys: EApiKey[] = [
  {
    id: 'ad0e253a-973b-4881-ae8d-10d1504ea378',
    key: 'a92d4e93df4949048994b5e133ae0fc6',
    name: 'Api key 1',
    lastUsed: null,
    createdAt: new Date('2023-11-06T18:07:23.528Z'),
    userId: 'cf84fa6b-81ce-4560-bfe2-d9f863384294',
  },
  {
    id: '35d14967-3669-4708-ba5d-b73911dc5179',
    key: '664a99e5d5c543d897f673e41dd61297',
    name: 'Smartcoorp',
    lastUsed: null,
    createdAt: new Date('2023-11-06T20:17:30.468Z'),
    userId: 'cf84fa6b-81ce-4560-bfe2-d9f863384294',
  },
];
