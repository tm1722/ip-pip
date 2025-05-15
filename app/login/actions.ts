'use server';

import { signIn } from 'app/auth';

export async function handleLogin(formData: FormData) {
  return await signIn('credentials', {
    redirectTo: '/',
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
}
