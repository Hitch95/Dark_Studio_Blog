const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE_URL);
export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error('Fail while registering user');
    }

    return response;
}

// export async function getUser(id) {
//     const response = await fetch(`${API_BASE_URL}user/${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//     if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Failed to fetch the user: ${errorData}`);
//     }
//     return await response.json();
// }

/**
 * Fetches a single post by its ID from the backend.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} The fetched post data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function getOnePost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to fetch post: ${errorData}`);
    }

    return await response.json();
}


export async function getAllPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to fetch posts: ${errorData}`);
    }

    return await response.json();
}
