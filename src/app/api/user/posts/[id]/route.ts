import { NextRequest, NextResponse } from 'next/server';
import postRepository from '@/../../repositories/postRepository';
import { Post } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  try {
    if (userId) {
      const posts = await postRepository.getPostsByUserId(userId);
      return new NextResponse(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error : ' + error + 'while fetching the posts of the user');
    return NextResponse.json({
      message: 'Database error',
      error: error.message,
    });
  }
}
