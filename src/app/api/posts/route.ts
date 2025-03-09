import { NextRequest, NextResponse } from 'next/server';
import postRepository from '../../../../repositories/postRepository';
import { Post } from '../../../types';

/*
async function handleGetPosts() {
  try {
    const posts = await postRepository.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Database Error:', error);
    return res
      .status(500)
      .json({ error: 'Database Error', message: error.message });
  }
}
*/

export async function GET() {
  try {
    const posts = await postRepository.getAllPosts();
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error : ' + error + 'while fetching all posts');
    return NextResponse.json({
      message: 'Database error',
      error: error.message,
    });
  }
}

// export const GET = async (req: NextRequest) => {
//   try {
//     const id = req.params.id;
//     const post = await postRepository.getPostById(id);
//     return NextResponse.json(post);
//   } catch (error) {
//     console.error('Error : ' + error + 'while fetching all posts');
//     return NextResponse.json({ message: 'Database error', error: error.message });
//   }
// }

async function handleGetOnePost(req, res) {
  try {
    const id = req.params.id;
    const post = await postRepository.getPostById(id);
    return res.status(200).json(post);
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Database Error' });
  }
}

async function handleCreatePost(req, res) {
  try {
    const post: Post = await req.json();
    const newPost = await postRepository.createPost(post);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Database Error' });
  }
}

function handleMethodNotAllowed(req, res) {
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
