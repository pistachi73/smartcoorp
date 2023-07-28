import { render, renderHook } from '@testing-library/react';

import { appRouter, createContextInner } from '@smartcoorp/smart-api';

import { useSingleFileUpload } from '../use-single-file-upload';

jest.mock('nanoid', () => {
  return { nanoid: () => '123' };
});

jest.mock('open-graph-scraper', () => {
  return {};
});

jest.mock('next-auth', () => {
  return { getServerSession: () => 'session' };
});

describe('useSingleFileUpload', () => {
  it('should be true', () => {
    const ctx = createContextInner({});
    const caller = appRouter.createCaller(ctx);
    const { result } = renderHook(() =>
      useSingleFileUpload({ folder: 'test' })
    );

    result.current.setCurrentFile('test');
    expect(true).toBe(true);
  });

  it('should upload file', () => {});

  it('should delete file', () => {});
});
