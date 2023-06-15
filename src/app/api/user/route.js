import { NextResponse } from "next/server";
import { db } from "@/utils/connectDB";
import { v4 as uuidv4 } from "uuid";


export const GET = async (request) => {

    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database. USER(GET)");

        let query = "SELECT * FROM users";

        const [rows] = await connection.execute(query);


        const users = rows.map((user) => { return { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin } })

        connection.end();
        console.log("Disconnected from the database. USER()");

        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const POST = async (request) => {
    const { email } = await request.json()

    // console.log('request: ', request);
    console.log('Recieved Email: ', email);

    // return new NextResponse(JSON.stringify({ email }), { status: 200 });


    if (email) {
        try {
            const connection = await db.classicConnection();
            console.log("Connected to the database. USER()");

            let query = "SELECT * FROM users  WHERE email = ?";
            let params = [];

            params.push(email)

            const [rows] = await connection.execute(query, params);

            const _user = rows[0]
            const user = {
                id: _user.id,
                username: _user.username,
                email: _user.email,
                isAdmin: _user.is_admin
            }

            connection.end();
            console.log("Disconnected from the database. USER()");

            return new NextResponse(JSON.stringify(user), { status: 200 });
        } catch (err) {
            console.error("Database Error:", err);
            return new NextResponse("Database Error", { status: 500 });
        }
    } else {
        return new NextResponse("Provide the valid email to get User data", { status: 500 });
    }
};

export const PUT = async (request) => {
    const { user } = await request.json()

    // console.log('request: ', request);
    console.log('Recieved USER: ', user);

    // return new NextResponse(JSON.stringify({ email }), { status: 200 });


    if (user) {
        try {
            const connection = await db.classicConnection();
            console.log("Connected to the database. USER(PUT)");

            let query = "UPDATE users SET is_admin = ?  WHERE id = ?";
            let params = [];

            params.push(user.isAdmin)
            params.push(user.id)

            const [result] = await connection.execute(query, params);
            const affectedRows = result.affectedRows; // Get the number of affected rows

            connection.end();
            console.log("Disconnected from the database. USER()");

            let message = user.isAdmin ? `${user.username} is made Admin by Admin` : 'Admin removed'

            if (affectedRows > 0) {
                // Query execution was successful
                return new NextResponse(JSON.stringify({ message }), { status: 200 });
            } else {
                // No rows were affected (query did not find a matching record)
                return new NextResponse("No records were updated", { status: 404 });
            }
        } catch (err) {
            console.error("Database Error:", err);
            return new NextResponse("Database Error", { status: 500 });
        }
    } else {
        return new NextResponse("Provide the valid email to get User data", { status: 500 });
    }
};