import getMetaData, { MetaData } from 'metadata-scraper';
import { z } from 'zod';

import { publicProcedure, router } from '../../utils/trpc';

export const metadataRouter = router({
  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log('hola');
    const data: MetaData = await getMetaData(input);

    console.log(data);
    return data;
  }),
});
