import { NextRequest, NextResponse } from 'next/server';

import prisma from '@smartcoorp/prisma';

export async function GET(request: NextRequest) {
  const headers = request.headers;

  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const wordcountgt = searchParams.get('wordcountgt');
  const wordcountlt = searchParams.get('wordcountlt');

  const auhtorization = headers.get('Authorization');

  if (!auhtorization) {
    return NextResponse.json(
      { error: 'Authentication failed. Please provide an API key' },
      { status: 401 }
    );
  }

  const apiKey = auhtorization.replace('Bearer ', '');
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
        userId: apiKeyData.userId,
        OR: [
          title ? { title: { contains: title } } : {},
          wordcountgt && !isNaN(Number(wordcountgt))
            ? { wordCount: { gte: Number(wordcountgt) } }
            : {},
          wordcountlt && !isNaN(Number(wordcountlt))
            ? { wordCount: { lte: Number(wordcountlt) } }
            : {},
        ],
      },
    });

    if (!postsData.length) {
      return new Response(null, {
        status: 204,
      });
    }

    return NextResponse.json({ data: postsData }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal server error. Please try again later!' },
      { status: 500 }
    );
  }
}
