import { NextResponse } from "next/server";
import { userRepository } from "../../../../../repositories/userRepository";


export async function POST(request) {
    const { username, email, password } = await request.json();

    try {
        await userRepository.insertUser(username, email, password);

        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}