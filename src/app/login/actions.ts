'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!data.email || !data.password) {
    console.error('All fields are required');
    return { success: false, error: 'All fields are required' };
  }

  console.log(data);

  try {
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result) {
      console.log('Login successful:', result);
      return { success: true };
    } else {
      console.error('Login failed');
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Error while try to login :', error);
    return { success: false, error: 'Error while try to login' };
  } finally {
    revalidatePath('/', 'layout');
    redirect('/');
  }
}
