import { type MetadataRoute } from 'next';

const URL = 'https://smarteditor.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${URL}/login`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${URL}/signup`,
      lastModified: new Date().toISOString(),
    },
  ];
}
