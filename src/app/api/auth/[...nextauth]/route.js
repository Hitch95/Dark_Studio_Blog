const bcrypt = require('bcrypt');
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import { db } from "@/utils/connectDB";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error("Invalid credentials");
                }

                const dbconnection = await db.classicConnection();

                console.log("Executing database query...");
                const [rows] = await dbconnection.execute("SELECT * FROM users WHERE email = ?", [email]);
                const user = rows[0];

                if (!user || !user.password) {
                    console.log("User not found or missing hashed password");
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(password, user.password);

                if (!isCorrectPassword) {
                    console.log("Incorrect password");
                    throw new Error("Invalid credentials");
                }

                console.log("Authorization successful");
                return user;
            },
        }),

    ],
    pages: {
        signIn: "/"
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
    /*
    callbacks: {
        session: ({ session, token }) => {
            console.log('Session Callback', { session, token })
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({ token, user }) => {
            console.log('JWT Callback', { token, user })
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
            return token
        }
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    */
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
