import fs from 'fs';
import path from 'path';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { NextRequest } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(200, '20 s'),
});
export async function GET(request: NextRequest) {
  const { url } = request;
  const query = new URL(url).searchParams;
  const key = query.get('key');

  const notFoundImagePath = path.resolve('.', 'public/image-not-found.png');
  const notFoundImageBlog = fs.readFileSync(notFoundImagePath);

  const notFoundImageResponse = new Response(notFoundImageBlog, {
    headers: {
      'Content-Type': 'image/png',
    },
  });

  if (!key) {
    return notFoundImageResponse;
  }

  const { success } = await ratelimit.limit(key);

  if (success) {
    return notFoundImageResponse;
  }

  const decodedKey = decodeURIComponent(key);

  let imageResult: Response;
  try {
    imageResult = await fetch(
      `${process.env['NEXT_PUBLIC_AWS_CLOUDFRONT_URL']}/${decodedKey}`
    );
  } catch (error) {
    return notFoundImageResponse;
  }

  const blob = await imageResult.blob();

  return new Response(blob, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
