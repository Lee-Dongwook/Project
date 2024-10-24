import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const isLoggedIn = !!token;
      const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard/');

      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
