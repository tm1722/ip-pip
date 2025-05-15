'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser, FaSignInAlt } from 'react-icons/fa';

export function UserButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(!!data?.user);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <div className="absolute top-4 right-4">
      {isLoggedIn ? (
        <Link
          href="/protected"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition flex items-center gap-1.5"
        >
          <FaUser />
          <span>Account</span>
        </Link>
      ) : (
        <Link
          href="/login"
          className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500 transition flex items-center gap-2"
        >
          <FaSignInAlt className="text-white hover:text-gray-800" />
          <span className="hidden hover:inline">Login</span>
        </Link>
      )}
    </div>
  );
}
