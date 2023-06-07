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
    return baseRepository.findOne(` SELECT posts.id, users.username, posts.title, posts.description, posts.image_src
                                    FROM posts
                                    INNER JOIN users ON users.id = posts.user_id
                                    WHERE posts.id = ?
                                `,
        [id]
    );
}

async function findAllPosts() {
    return baseRepository.findAll("posts");
}



export const postRepository = {
    insertPost,
    updatePost,
    deletePost,
    findPost,
    findAllPosts,
    ...baseRepository
}