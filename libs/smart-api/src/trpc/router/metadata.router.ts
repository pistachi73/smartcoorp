// import getMetaData, { MetaData } from 'metadata-scraper';
import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const metadataRouter = router({
  getByUrl: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    console.log(input);
    // const data: MetaData = await getMetaData(input);

    // console.log(data);
    return { message: 'HOla' };
  }),
});
