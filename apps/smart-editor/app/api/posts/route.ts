import { EPostStatus } from '@prisma/client';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { NextRequest, NextResponse } from 'next/server';

import prisma from '@smartcoorp/prisma';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(200, '1 s'),
});

const isValidStatus = (status: any): status is EPostStatus => {
  return EPostStatus[status as keyof typeof EPostStatus] !== undefined;
};

export async function GET(request: NextRequest) {
  const headers = request.headers;

  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const wordcountgt = searchParams.get('wordcountgt');
  const wordcountlt = searchParams.get('wordcountlt');
  const status = searchParams.get('status');

  const auhtorization = headers.get('Authorization');

  if (!auhtorization) {
    return NextResponse.json(
      { error: 'Authentication failed. Please provide an API key' },
      { status: 401 }
    );
  }

  const apiKey = auhtorization.replace('Bearer ', '');

  const { success } = await ratelimit.limit(apiKey);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded, please try again later' },
      { status: 429 }
    );
  }

  try {
    const apiKeyData = await prisma.eApiKey.findUnique({
      where: {
        key: apiKey,
      },
      select: {
        userId: true,
      },
    });

    if (!apiKeyData?.userId) {
      return NextResponse.json(
        { error: 'Authentication failed, please provide a valid API key' },
        { status: 401 }
      );
    }

    const postsData = await prisma.ePost.findMany({
      where: {
        AND: [
          {
            userId: apiKeyData.userId,
          },
          {
            OR: [
              title ? { title: { contains: title } } : {},
              wordcountgt && !isNaN(Number(wordcountgt))
                ? { wordCount: { gte: Number(wordcountgt) } }
                : {},
              wordcountlt && !isNaN(Number(wordcountlt))
                ? { wordCount: { lte: Number(wordcountlt) } }
                : {},
              isValidStatus(status) ? { status: { equals: status } } : {},
            ],
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        wordCount: true,
        createdAt: true,
        updatedAt: true,
        content: true,
        coverImageUrl: true,
        status: true,
      },
    });

    if (!postsData.length) {
      return new Response(null, {
        status: 204,
      });
    }

    return NextResponse.json(
      { data: postsData, count: postsData.length },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal server error. Please try again later!' },
      { status: 500 }
    );
  }
}
