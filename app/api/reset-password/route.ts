import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { token, password } = JSON.parse(req.body);

  const result = await db.query(
    'SELECT email FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()',
    [token]
  );

  if (result.rows.length === 0) return res.status(400).send('Invalid token');

  const email = result.rows[0].email;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
  await db.query('DELETE FROM password_reset_tokens WHERE token = $1', [token]);

  res.status(200).end();
}
