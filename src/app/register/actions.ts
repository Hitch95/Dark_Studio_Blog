'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  console.log(data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('actions.ts in /register. Error :', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
