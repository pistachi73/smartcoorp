import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { NextRequest } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 s'),
});

export async function GET(request: NextRequest) {
  const { url } = request;
  const query = new URL(url).searchParams;
  const key = query.get('key');

  const headers = request.headers;

  const host = headers.get('host');

  if (!key) {
    return new Response('Key is required');
  }

  const decodedKey = decodeURIComponent(key);

  if (!host?.includes('localhost') && !host?.includes('smarteditor')) {
    const { success } = await ratelimit.limit(key);
    if (!success) {
      return new Response('Rate limit exceeded');
    }
  }
  let imageResult: Response;

  try {
    imageResult = await fetch(
      `${process.env['NEXT_PUBLIC_AWS_CLOUDFRONT_URL']}/${decodedKey}`
    );
  } catch (error) {
    return new Response('Image not found');
  }

  const blob = await imageResult.blob();

  return new Response(blob, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
