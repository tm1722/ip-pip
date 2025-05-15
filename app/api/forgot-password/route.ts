import { randomBytes } from 'crypto';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  console.log('[API] Received forgot-password request');

  try {
    const { email } = await request.json();
    console.log('[API] Parsed email:', email);

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    console.log('[API] Generated reset token');

    await db.query(
      'INSERT INTO password_reset_tokens (email, token, expires_at) VALUES ($1, $2, $3)',
      [email, token, expiresAt]
    );
    console.log('[API] Token saved to database');

    const resetUrl = `https://yourdomain.com/reset-password?token=${token}`;
    console.log('[API] Generated reset URL:', resetUrl);

    await sendEmail(email, 'Reset Your Password', `Click to reset: ${resetUrl}`);
    console.log('[API] Email sent via Resend');

    return new Response(null, { status: 200 });
  } catch (err: any) {
    console.error('[API] ❌ Error in forgot-password route:', err.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}
