import { NextResponse } from "next/server";
import { db } from "@/utils/connectDB";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


const HTTP_STATUS_OK = 200;
const HTTP_STATUS_ERROR = 500;

const getUserByEmail = async (email) => {
    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database. User Api");

        const query = "SELECT * FROM users WHERE email = ?";
        const params = [email];

        const [rows] = await connection.execute(query, params);

        const _user = rows[0];
        const user = {
            id: _user.id,
            username: _user.username,
            email: _user.email,
            isAdmin: _user.is_admin,
        };

        connection.end();
        console.log("Disconnected from the database. User Api");

        return user;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to retrieve user from database");
    }
};

export const GET = async (request) => {
    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database. GET");

        const query = "SELECT * FROM users";
        const [rows] = await connection.execute(query);

        const users = rows.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.is_admin,
        }));

        connection.end();
        console.log("Disconnected from the database. GET");

        return new NextResponse(JSON.stringify(users), { status: HTTP_STATUS_OK });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: HTTP_STATUS_ERROR });
    }
};

export const POST = async (request) => {
    try {
        const { email } = await request.json();
        console.log("Received Email:", email);

        if (email) {
            const user = await getUserByEmail(email);
            return new NextResponse(JSON.stringify(user), { status: HTTP_STATUS_OK });
        } else {
            return new NextResponse(
                "Provide a valid email to get user data",
                { status: HTTP_STATUS_ERROR }
            );
        }
    } catch (err) {
        console.error("Error:", err);
        return new NextResponse(err.message, { status: HTTP_STATUS_ERROR });
    }
};

export const PUT = async (request) => {
    try {
        const user = await request.json();
        console.log("Received USER:", user);

        if (user) {
            const connection = await db.classicConnection();
            console.log("Connected to the database. PUT");

            const query =
                "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
            const params = [
                user?.username,
                user?.email,
                await bcrypt.hash(user?.password, 10),
                user?.id,
            ];

            const [result] = await connection.execute(query, params);
            const affectedRows = result.affectedRows;

            connection.end();
            console.log("Disconnected from the database. PUT");

            let message = user.isAdmin
                ? `${user.username} is made Admin by Admin`
                : "Admin removed";

            if (affectedRows > 0) {
                return new NextResponse(JSON.stringify({ message }), {
                    status: HTTP_STATUS_OK,
                });
            } else {
                return new NextResponse("No records were updated", {
                    status: 404,
                });
            }
        } else {
            return new NextResponse(
                "Provide the valid email to get User data",
                { status: HTTP_STATUS_ERROR }
            );
        }
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: HTTP_STATUS_ERROR });
    }
};