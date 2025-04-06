'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import bcrypt from 'bcryptjs';

import supabaseClient from '@/utils/supabase/client';

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
      },
    },
  };
  console.log(data);

  if (
    !data.email ||
    !data.password ||
    !data.options.data.username ||
    !data.options.data.firstName ||
    !data.options.data.lastName
  ) {
    console.error('All fields are required');
    return { success: false, error: 'All fields are required' };
  }

  try {
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp(data);

    if (authError) {
      console.error('Error creating auth user:', authError);
      return {
        success: false,
        error: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'User not created for unknown reason',
      };
    }

    const { error: insertError } = await supabaseClient.from('users').insert([
      {
        id: authData.user.id,
        email: data.email,
        username: data.options.data.username,
        first_name: data.options.data.firstName,
        last_name: data.options.data.lastName,
        email_verified: false,
        password: await bcrypt.hash(data.password, 10),
      },
    ]);

    if (insertError) {
      console.error('Error inserting user into custom table:', insertError);
      return {
        success: false,
        error: insertError.message,
      };
    }

    // 3. automatic connection with Auth.js (Next Auth)
    const signInResult = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!signInResult?.ok) {
      return {
        success: true,
        message:
          'Registration successful, but automatic login failed. Please log in manually.',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'An error has occurred',
    };
  }
}
