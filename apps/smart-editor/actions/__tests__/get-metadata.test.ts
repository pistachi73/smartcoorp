import ogs from 'open-graph-scraper';

import { getMetadata } from '../get-metadata';

jest.mock('open-graph-scraper');

describe('get-metadata', () => {
  it('should return null if no data', async () => {
    (ogs as jest.Mock).mockResolvedValueOnce(null);

    const data = await getMetadata('https://www.google.com');
    expect(data).toBeNull();
  });

  it('should return metadata', async () => {
    const ogsOutput = {
      ogTitle: 'mockTitle',
      ogDescription: 'mockDescription',
      ogImage: [
        {
          url: 'mockImageUrl',
        },
      ],
      ogUrl: 'mockUrl',
    };

    (ogs as jest.Mock).mockResolvedValueOnce({
      result: ogsOutput,
    });

    const data = await getMetadata('any');
    expect(data).toEqual({
      title: 'mockTitle',
      description: 'mockDescription',
      image: 'mockImageUrl',
      url: 'mockUrl',
    });
  });
});
