import { baseRepository } from "./baseRepository";
import { v4 as uuidv4 } from "uuid";



export async function insertPost(post) {

    const { user_id, title, description, content, image } = post;

    const data = { user_id, title, description, content, image }

    return baseRepository.insert("post", data);
}

async function updatePost(id, entries) {
    await baseRepository.update("posts", id, entries);
}


export async function deletePost(id) {
    try {
        await baseRepository.remove("posts", id);
        return "Post has been deleted";
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Database Error");
    }
}


async function findPost(id) {
    console.log(`Finding post with ID: ${id}`);
    const result = await baseRepository.findOne(`SELECT * FROM posts WHERE id = ?`, [id]);
    if (!result) {
        console.log(`No post found with ID: ${id}`);
    }
    return result;
}


async function findAllPosts(username) {
    let query = "SELECT * FROM posts";
    let params = [];

    // Adding a condition to filter by username if provided
    if (username) {
        query += " WHERE username = ?";
        params.push(username);
    }

    // Using the generalized findAll function for fetching data
    if (params.length > 0) {
        return await baseRepository.find(query, params);
    } else {
        return await baseRepository.findAll("posts");
    }
}



export const postRepository = {
    insertPost,
    updatePost,
    deletePost,
    findPost,
    findAllPosts,
    ...baseRepository
}