import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export const {
  auth,         // used in middleware.ts or `getServerSession`
  handlers: { GET, POST }, // API route handlers
  signIn, signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('[Auth] Received credentials:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.warn('[Auth] Missing email or password');
          return null;
        }

        const result = await db.query(
          'SELECT id, email, password FROM users WHERE email = $1',
          [credentials.email]
        );

        const user = result.rows[0];
        console.log('[Auth] Fetched user:', user);

        if (!user || typeof user.password !== 'string') {
          console.warn('[Auth] User not found or password invalid format');
          return null;
        }

        if (!user || typeof user.password !== 'string') {
          console.warn('[Auth] Invalid user or missing password');
          return null;
        }

        const valid = await bcrypt.compare(String(credentials.password), String(user.password));

        if (!valid) {
          console.warn('[Auth] Invalid password');
          return null;
        }

        console.log('[Auth] ✅ Authenticated:', user.email);
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
