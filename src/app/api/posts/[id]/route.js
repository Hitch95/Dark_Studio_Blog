import { NextResponse } from "next/server";
import { db } from "../../../../utils/connectDB";
import { postRepository } from "../../../../../repositories/postRepository";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        const connection = await db.classicConnection();

        console.log("GET Request - Post ID:", id);

        const query = "SELECT * FROM posts WHERE id = ?";
        const params = [id];

        console.log("Executing SQL query:", query, params);

        const [rows] = await connection.execute(query, params);

        if (rows.length === 0) {
            console.log("Post not found");
            return new NextResponse("Post not found", { status: 404 });
        }

        const post = rows[0];

        console.log("Retrieved Post:", post);

        connection.end();

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};


export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await postRepository.deletePost(id);
        console.log("Post has been deleted");

        return new NextResponse("Post has been deleted", { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};


export const PUT = async (request, { params }) => {

    const { id } = params
    const body = await request.json();

    const { title, description, content, image, user } = body;
    const user_id = user?.id;
    const username = user?.username;
    try {
        const connection = await db.classicConnection();

        const query = `
        UPDATE posts
        SET title = ?, description = ?, content = ?, user_id = ?, username = ?
        WHERE id = ?
      `;
        const params = [title, description, content, user_id, username, id];

        // Verify undefined value and replace them by null
        const sanitizedParams = params.map((param) => (param !== undefined ? param : null));

        console.log("Connected to the database");

        await connection.execute(query, sanitizedParams);
        console.log("Post updated:", { id, title, description, content, user_id, username });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been updated", { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};