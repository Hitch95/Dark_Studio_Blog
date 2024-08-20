import { NextResponse } from "next/server";
import db from "../../../utils/connectDB";
import { v4 as uuidv4 } from "uuid";
import { postRepository } from "../../../../repositories/postRepository";

export const GET = async (request) => {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    try {
        const posts = await postRepository.findAllPosts(username);

        console.log("Retrieved posts:", posts);

        return new NextResponse(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};


export const POST = async (request, session) => {
    const body = await request.json();

    const { title, description, content, image, user } = body;
    const id = uuidv4();
    const user_id = user?.id;
    const username = user?.username;

    console.log(user_id);

    try {
        const connection = await db.classicConnection();

        const query = `
        INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id, user_id, title, description, content, image, username];

        // Verify undefined value and replace them by null
        const sanitizedParams = params.map((param) => (param !== undefined ? param : null));

        console.log("Connected to the database");

        await connection.execute(query, sanitizedParams);
        console.log("Post inserted:", { id, user_id, title, description, content, image, username });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};
