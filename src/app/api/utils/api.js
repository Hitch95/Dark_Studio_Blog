const BASE_URL = 'http://localhost:3000/api/posts';

export async function fetchPost(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Post not found');
    return await response.json();
}

export async function updatePost(id, data) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
}

export async function deletePost(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
}
