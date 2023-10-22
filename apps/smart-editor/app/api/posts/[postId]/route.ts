import { NextRequest, NextResponse } from 'next/server';

import prisma from '@smartcoorp/prisma';
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const headers = request.headers;

  const auhtorization = headers.get('Authorization');

  if (!auhtorization) {
    return NextResponse.json(
      { error: 'Authentication failed, please provide an API key' },
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

    const post = await prisma.ePost.findUnique({
      where: {
        userId: apiKeyData.userId,
        id: params.postId,
      },
    });

    if (!post) {
      return new Response(null, {
        status: 204,
      });
    }

    return NextResponse.json({ data: post }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later!' },
      { status: 500 }
    );
  }
}
