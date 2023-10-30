'use server';

import ogs from 'open-graph-scraper';

export const getMetadata = async (url: string) => {
  const data = await ogs({ url });
  if (!data || data?.error) return null;

  return {
    title: data.result.ogTitle,
    description: data.result.ogDescription,
    image: data.result.ogImage?.[0]?.url,
    url: data.result.ogUrl,
  };
};
