import { TextDecoder, TextEncoder } from 'util';

import { jest } from '@jest/globals';

Object.assign(global, { TextDecoder, TextEncoder });

jest.mock('nanoid', () => {
  return {
    nanoid: jest.fn().mockReturnValue('mocked-nanoid'),
  };
});
