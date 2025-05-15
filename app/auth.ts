import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { db } from '@/lib/db';
import { authConfig } from 'app/auth.config';
import bcrypt from 'bcrypt';


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('[Auth] Received credentials:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.warn('[Auth] Missing email or password');
          return null;
        }

        const result = await db.query('SELECT * FROM "User" WHERE email = $1', [credentials.email]);
        const user = result.rows[0];

        if (!user) {
          console.warn('[Auth] User not found');
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) {
          console.warn('[Auth] Invalid password');
          return null;
        }

        console.log('[Auth] User authenticated successfully:', user.email);
        return { id: user.id, email: user.email };
      },
    }),
  ],
});
