import { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // defined elsewhere for Node.js compatibility
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/login';
      const isProtectedPage = nextUrl.pathname.startsWith('/protected') || nextUrl.pathname === '/account';

      // Trying to access login page while already logged in -> redirect to account
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/account', nextUrl));
      }

      // Trying to access protected page while not logged in -> redirect to login
      if (isProtectedPage && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      // Allow everything else
      return true;
    },
  },
} satisfies NextAuthConfig;
