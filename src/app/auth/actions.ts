// src/app/auth/actions.ts
'use server';

import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import authService from '@/services/authService';
import { createClient } from '@/utils/supabase/client';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { token, error } = await authService.login(email, password);

  if (error || !token) {
    return { error: error || 'Failed to login' };
  }

  // Set the token in a cookie
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  redirect('/dashboard');
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { user, error } = await authService.register(email, password);

  if (error || !user) {
    return { error: error || 'Failed to register' };
  }

  // Automatically log the user in
  return login(formData);
}

export async function logout() {
  // Clear the auth cookie
  // (await cookies()).delete('auth-token');
  const supabase = createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  // Redirect to the login page
  redirect('/login');
}

// export async function getCurrentUser() {
// //   const token = cookies().get('auth-token')?.value;
//     const cookieStore = await cookies();
//     const hasCookie = cookieStore.has('auth-token');

//   if (!hasCookie) {
//     return null;
//   }

//   return authService.getCurrentUser(token);
// }
