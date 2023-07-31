const mockCreatePresignedPost = jest.fn();
import { createCaller } from '@smart-api/test/setup-trpc';
import { TRPCError } from '@trpc/server';

import { s3 } from '../media.router';

const mockFileUrl = 'https://test.png';
const mockFolder = 'mockFolder';
const mockFileExtension = 'png';

jest.mock('@aws-sdk/s3-presigned-post', () => ({
  createPresignedPost: mockCreatePresignedPost,
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockReturnValue('mockId'),
}));

const Expires = 600;
const Fields = {};
const Conditions = [
  ['starts-with', '$Content-Type', ''],
  ['content-length-range', 0, 1000000],
];

describe('Media Router', () => {
  describe('createPresignedUrl', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should return presignedUrl if fileUrl is provided', async () => {
      const caller = createCaller();

      await caller.media.createPresignedUrl({
        fileExtension: mockFileExtension,
        folder: mockFolder,
        fileUrl: mockFileUrl,
      });

      expect(mockCreatePresignedPost).toHaveBeenCalledWith(s3, {
        Bucket: 'smartcoorp',
        Key: `${mockFolder}/${mockFileUrl.split('/').pop()}`,
        Fields,
        Conditions,
        Expires,
      });
    });

    it('should throw error if bad fileUrl is provided', async () => {
      const caller = createCaller();

      await expect(
        caller.media.createPresignedUrl({
          fileExtension: mockFileExtension,
          folder: mockFolder,
          fileUrl: 'badUrl',
        })
      ).rejects.toThrowError(
        new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid file url',
        })
      );
    });
    it('should return presigned url if fileUrl is not provided', async () => {
      const caller = createCaller();

      await caller.media.createPresignedUrl({
        fileExtension: mockFileExtension,
        folder: mockFolder,
      });

      expect(mockCreatePresignedPost).toHaveBeenCalledWith(s3, {
        Bucket: 'smartcoorp',
        Key: `${mockFolder}/mockId.${mockFileExtension}`,
        Fields,
        Conditions,
        Expires,
      });
    });
  });
});
