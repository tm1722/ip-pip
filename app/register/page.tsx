'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitButton } from 'app/submit-button';

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const date_of_birth = formData.get('date_of_birth') as string;
    const place_of_occupation = formData.get('place_of_occupation') as string;
    const education = formData.get('education') as string;

    const newErrors: Record<string, string> = {};

    // Password rules
    const passwordErrors: string[] = [];

    if (password.length < 8) {
      passwordErrors.push('• At least 8 characters\n');
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push('• At least one lowercase letter\n');
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push('• At least one uppercase letter\n');
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      passwordErrors.push('• At least one symbol (e.g. !, @, #)\n');
    }

    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }


    // Date of birth rules
    const dob = new Date(date_of_birth);
    const now = new Date();
    const minYear = 1925;
    const minAge = 18;

    if (dob.getFullYear() < minYear) {
      newErrors.date_of_birth = `Date of birth cannot be before ${minYear}.`;
    } else {
      const age = now.getFullYear() - dob.getFullYear() - (now < new Date(dob.setFullYear(now.getFullYear())) ? 1 : 0);
      if (age < minAge) {
        newErrors.date_of_birth = 'You must be at least 18 years old.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors, send to server
    const res = await fetch('/register', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.push('/login');
    } else {
      setErrors({ general: 'Failed to register. Please try again.' });
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
          <h3 className="text-xl font-semibold text-center">Sign Up</h3>
          <p className="text-sm text-gray-500 text-center">
            Create an account with your information
          </p>

          <input name="email" type="email" required placeholder="Email" className="w-full p-2 border rounded" />
          <input name="password" type="password" required placeholder="Password" className="w-full p-2 border rounded" />
          {Array.isArray(errors.password) && (
            <p className="whitespace-pre-line text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
              {errors.password.join('')}
            </p>
          )}

          <input name="first_name" required placeholder="First Name" className="w-full p-2 border rounded" />
          <input name="last_name" required placeholder="Last Name" className="w-full p-2 border rounded" />
          <input name="date_of_birth" type="date" required className="w-full p-2 border rounded" />
          {errors.date_of_birth && <p className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">{errors.date_of_birth}</p>}

          <input name="place_of_occupation" placeholder="Place of Occupation" className="w-full p-2 border rounded" />
          <input name="education" placeholder="Education" className="w-full p-2 border rounded" />

          {errors.general && <p className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">{errors.general}</p>}

          <SubmitButton>Sign Up</SubmitButton>

          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </form>
      </div>
    </div>
  );
}
