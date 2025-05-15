import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    const result = await db.query(
      'SELECT email FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return new Response('Invalid or expired token', { status: 400 });
    }

    const email = result.rows[0].email;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'UPDATE User SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );

    await db.query('DELETE FROM password_reset_tokens WHERE token = $1', [token]);

    return new Response('Password reset successful', { status: 200 });
  } catch (err) {
    console.error('[Reset Password] Error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
