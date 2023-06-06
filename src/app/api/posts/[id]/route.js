import { NextResponse } from "next/server";
import { db } from "@/utils/connectDB";

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
        const connection = await db.classicConnection();

        console.log("DELETE Request - Post ID:", id);

        const query = "DELETE FROM posts WHERE id = ?";
        const params = [id];

        console.log("Executing SQL query:", query, params);

        await connection.execute(query, params);

        console.log("Post has been deleted");

        connection.end();

        return new NextResponse("Post has been deleted", { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};
