const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Works well
export async function getAllPosts() {
  const response = await fetch(`${apiUrl}/posts`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch posts: ${response.status} ${response.statusText}`
    );
    throw new Error('Failed to fetch posts');
  }
  return await response.json();
}

// Works well
export async function getOnePost(id: string) {
  const response = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'GET',
    cache: 'force-cache',
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to fetch post: ${errorData}`);
  }

  return await response.json();
}

export async function fetchPost(id: string) {
  const response = await fetch(`${apiUrl}/posts/${id}`);
  if (!response.ok) throw new Error('Post not found');
  return await response.json();
}

export async function updatePost(id: string, data) {
  const response = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

export async function deletePost(id: string) {
  const response = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
}
