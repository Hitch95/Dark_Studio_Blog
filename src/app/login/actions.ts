'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import bcrypt from 'bcrypt';

export async function login(formData: FormData): Promise<void> {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!data.email || !data.password) {
    console.error('All fields are required');
    throw new Error('All fields are required');
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
    } else {
      console.error('Login failed');
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Error while try to login :', error);
    throw error;
  } finally {
    revalidatePath('/', 'layout');
    redirect('/');
  }
}
