import { NextRequest, NextResponse } from 'next/server';
import postRepository from '@/../repositories/postRepository';
import { Post } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ message: 'User ID missing' }, { status: 400 });
  }

  try {
    const posts = await postRepository.getPostsByUserId(userId);
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error while fetching user posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'Database error',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
