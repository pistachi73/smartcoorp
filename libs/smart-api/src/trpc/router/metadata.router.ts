import ogs from 'open-graph-scraper';
import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const metadataRouter = router({
  getByUrl: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const data = await ogs({ url: input });

    if (!data.error) {
      return {
        title: data.result.ogTitle,
        description: data.result.ogDescription,
        image: data.result.ogImage?.[0]?.url,
        url: data.result.ogUrl,
      };
    }

    return null;
  }),
});
