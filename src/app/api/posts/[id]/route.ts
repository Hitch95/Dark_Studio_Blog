import { NextRequest, NextResponse } from 'next/server';
import postRepository from '../../../../../repositories/postRepository';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérification que l'ID existe
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'ID missing' }, { status: 400 });
    }

    // Récupération du post
    const post = await postRepository.getPostById(id);

    // Vérification que le post existe
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Retourne le post trouvé
    return NextResponse.json(post, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erreur :', error, 'while trying to get the post');
    return NextResponse.json(
      {
        message: 'Server error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case 'PATCH':
//       return await handleUpdatePost(req, res);
//     case 'DELETE':
//       return await handleDeletePost(req, res);
//     default:
//       return handleMethodNotAllowed(req, res);
//   }
// }

// async function handleUpdatePost(req, res) {
//   try {
//     const id = req.query.id;
//     const post: Post = req.body;
//     const updatedPost = await postRepository.updatePost(id, post);
//     return res.status(200).json(updatedPost);
//   } catch (error) {
//     console.error('Database Error:', error);
//     return res.status(500).json({ error: 'Database Error' });
//   }
// }

// async function handleDeletePost(req, res) {
//   try {
//     const { id } = req.query;
//     await postRepository.deletePost(id);
//     return res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.error('Database Error:', error);
//     return res.status(500).json({ error: 'Database Error' });
//   }
// }

// function handleMethodNotAllowed(req, res) {
//   res.setHeader('Allow', ['PATCH', 'DELETE']);
//   return res.status(405).end(`Method ${req.method} Not Allowed`);
// }
