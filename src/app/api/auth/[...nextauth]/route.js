import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcrypt";
import db from "../../../../utils/connectDB";

const handler = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
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
        signIn: "/dashboard/login",
        error: "/dashboard/login"
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.uuid;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.uuid = user.id;
            }
            return token;
        }
    }
});

export { handler as GET, handler as POST };
