import { NextResponse } from "next/server";
import { db } from "@/database/connectDB";

export const GET = async (request) => {
    const url = new URL(request.url);

    const username = url.searchParams.get("username");

    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database");

        let query = "SELECT * FROM posts";
        let params = [];

        if (username) {
            query += " WHERE username = ?";
            params.push(username);
        }

        const [rows] = await connection.execute(query, params);
        const posts = rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            // Add other properties here based on your data structure
        }));
        console.log("Retrieved posts:", posts);

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();

    const { title, description } = body;

    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database");

        const query = "INSERT INTO posts (title, description) VALUES (?, ?)";
        const params = [title, description];

        await connection.execute(query, params);
        console.log("Post inserted:", { title, description });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};
