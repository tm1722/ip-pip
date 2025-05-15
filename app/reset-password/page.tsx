'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const [password, setPassword] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    alert('Password reset successful!');
  };

  return (
    <form onSubmit={handleReset} className="p-8">
      <h1 className="text-lg font-bold mb-4">Reset Password</h1>
      <input
        type="password"
        required
        placeholder="New password"
        className="border p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-black text-white px-4 py-2">
        Reset Password
      </button>
    </form>
  );
}
