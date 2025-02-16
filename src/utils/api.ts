 const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function registerUser(userData) {
//     const response = await fetch(`${apiUrl}/auth/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData)
//     });

//     if (!response.ok) {
//         throw new Error('Fail while registering user');
//     }

//     return response;
// }

// export async function getOnePost(id) {
//     const response = await fetch(`${apiUrl}/posts/${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     });

//     if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Failed to fetch post: ${errorData}`);
//     }

//     return await response.json();
// }
 export async function getAllPosts() {
   const response = await fetch(`${apiUrl}/posts`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     }
   });

   if (!response.ok) {
     console.error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
     throw new Error('Failed to fetch posts');
   }

   return await response.json();
 };
