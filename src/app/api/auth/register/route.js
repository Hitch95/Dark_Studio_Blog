import { NextResponse } from "next/server";
import { userRepository } from "../../../../../repositories/userRepository";

export async function POST(request) {
    const { username, email, password } = await request.json();

    try {
        await userRepository.insertUser(username, email, password);

        // Return a response with a success flag
        return new NextResponse(JSON.stringify({ success: true, message: "User has been created" }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error while user creation: ", error);
        // Include a success flag in the error response
        return new NextResponse(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
