'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold mb-4">Forgot Password</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            className="border p-2 mr-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-black text-white px-4 py-2">
            Send reset link
          </button>
        </form>
      ) : (
        <p>Check your email for a reset link.</p>
      )}
    </div>
  );
}
