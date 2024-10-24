import type { AuthOptions } from 'next-auth';

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
        };
      }
      return session;
    },
  },
  providers: [],
};
