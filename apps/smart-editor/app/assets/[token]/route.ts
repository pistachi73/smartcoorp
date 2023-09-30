import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { usePathname } from 'next/navigation';
import { NextRequest } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(1, '20 s'),
});
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const { success } = await ratelimit.limit(token);

  console.log({ success, token });
  // if (!success) {
  //   return new Response('Too many requests', { status: 429 });
  // }

  const res = await fetch(
    'https://d3hzrtj83k3mqs.cloudfront.net/testimage.png'
  );

  const blob = await res.blob();

  return new Response(blob, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
