import { createCaller } from '@smart-api/test/setup-trpc';
import ogs from 'open-graph-scraper';

jest.mock('open-graph-scraper', () => ({
  default: jest.fn(),
}));

// here the whole foo var is mocked deeply

describe('Medatada Router', () => {
  const mockedOgs = ogs as jest.Mock;

  it("should return null if there's an error", async () => {
    mockedOgs.mockResolvedValue(null);
    const caller = createCaller();

    const result = await caller.metadata.getByUrl('https://example.com');

    expect(result).toBeNull();
  });

  it('should return the metadata', async () => {
    const mockedOgsResultValue = {
      result: {
        ogTitle: 'title',
        ogDescription: 'description',
        ogImage: [{ url: 'image' }],
        ogUrl: 'url',
      },
    };

    mockedOgs.mockResolvedValue(mockedOgsResultValue);

    const caller = createCaller();

    const result = await caller.metadata.getByUrl('https://example.com');

    const expectedResult = {
      title: mockedOgsResultValue.result.ogTitle,
      description: mockedOgsResultValue.result.ogDescription,
      image: mockedOgsResultValue.result.ogImage?.[0]?.url,
      url: mockedOgsResultValue.result.ogUrl,
    };

    expect(result).toStrictEqual(expectedResult);
  });
});
