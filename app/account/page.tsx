// /app/protected/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AccountPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data?.user) {
          router.push('/login'); // not logged in
        } else {
          setUser(data.user);
        }
      });
  }, [router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // send to main page
  };

  if (!user) return <p className="p-8">Loading account...</p>;

  return (
    <div className="max-w-md mx-auto p-8 mt-12 border rounded shadow">
      <h1 className="text-xl font-bold mb-6">Account Details</h1>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-6">
        <strong>Password:</strong> ********
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
