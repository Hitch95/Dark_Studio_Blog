'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string,
      },
    },
  };
  console.log(data);

  if (!data.options || !data.email || !data.password) {
    console.error('All fields are required');
    return { success: false, error: 'All fields are required' };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(
      'An error occurred while creating your account. Error: ',
      error
    );
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message:
      'Registration successful! Please check your email to confirm your account.',
  };
}
