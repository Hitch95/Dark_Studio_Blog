import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google'; // Will add later

import supabaseClient from '@/utils/supabase/client';

// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from '@/utils/password';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Authentication with Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error || !data?.user) {
          console.error('Error signing in: ', error);
          throw new Error(error?.message || 'Identifiants invalides');
        }
        // If you return null or false then the credentials will be rejected
        // You can also Redirect them to another page

        // logic to verify if the user exists
        const { data: user, error: userError } = await supabaseClient
          .from('users')
          .select('*')
          .eq('email', data.user.email)
          .single();
        if (userError || !user) {
          console.error('Error fetching user: ', userError);
          return null;
        }

        // return user object with their profile data
        return {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          email: user.email,
          emailVerified: user.email_verified,
          password: user.password,
          image: user.image_src,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          isAdmin: user.is_admin,
        };
      },
    }),
    Google({
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Simple, explicit mapping: assign only defined token fields to session.user
      if (!token || !session.user) return session;

      if (token.id !== undefined) {
        session.user.id = token.id as string;
      }

      if (token.username !== undefined) {
        session.user.username = token.username as string;
      }

      if (token.firstName !== undefined) {
        session.user.firstName = token.firstName as string;
      }

      if (token.lastName !== undefined) {
        session.user.lastName = token.lastName as string;
      }

      if (token.isAdmin !== undefined) {
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      // If the user has just logged in, enrich the token
      if (user) {
        // Retrieve complete user data from your table
        const { data: userData, error } = await supabaseClient
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (userData && !error) {
          // Add all data to the token
          token.id = userData.id;
          token.username = userData.username;
          token.firstName = userData.first_name;
          token.lastName = userData.last_name;
          token.isAdmin = userData.is_admin;
        }
      }
      return token;
    },
  },
});
