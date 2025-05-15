import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from 'app/submit-button';
import { log } from 'console';

export default function Login() {
  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    
    let first_name = formData.get('first_name') as string;
    let last_name = formData.get('last_name') as string;
    let date_of_birth = formData.get('date_of_birth') as string;
    let place_of_occupation = formData.get('place_of_occupation') as string | null;
    let education = formData.get('education') as string | null;
    let user = await getUser(email);

    if (user.length > 0) {
            return (
              <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
              This user already exists.{' '}
              <Link href="/forgot-password" className="font-semibold underline">
                Did you by any chance forget your password?
              </Link>
              </div>
            );
      log('User already exists');
      return 'User already exists'; // TODO: Handle errors with useFormStatus
    } else {
      console.log('[CREATE USER] Arguments:', {
        email,
        password,
        first_name,
        last_name,
        date_of_birth,
        place_of_occupation,
        education
      });

      await createUser({
        email,
        password,
        first_name,
        last_name,
        date_of_birth,
        place_of_occupation,
        education,
        user_type: 'User' // set automatically
      });
      redirect('/login');
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <Form action={register} includeAuthFields={false}>
          <div className="p-4 space-y-4">
            <input name="email" type="email" required placeholder="Email" className="..." />
            <input name="password" type="password" required placeholder="Password" className="..." />
            <input name="first_name" required placeholder="First Name" className="..." />
            <input name="last_name" required placeholder="Last Name" className="..." />
            <input name="date_of_birth" type="date" required className="..." />
            <input name="place_of_occupation" placeholder="Place of Occupation" className="..." />
            <input name="education" placeholder="Education" className="..." />
          </div>

          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </Form>

      </div>
    </div>
  );
}
