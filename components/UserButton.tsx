'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  if (isLoggedIn === null) return null; // Loading...

  return (
    <div className="absolute top-4 right-4">
      {isLoggedIn ? (
        <Link href="/account" className="relative group">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Account
          </span>
        </Link>
      ) : (
        <Link href="/login" className="relative group">
          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Login
          </span>
        </Link>
      )}
    </div>
  );
}
