import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. If user is logged in and tries to access /login → redirect to /profile
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // 2. Protect /profile and /admin: If NO token → redirect to /login
    // NextAuth withAuth handles the "authorized" check below, 
    // but we can add an extra safety check here if needed.
    if (!token && (pathname.startsWith("/profile") || pathname.startsWith("/admin"))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // The middleware function only runs if 'authorized' returns true.
      // We check if the token exists for protected routes.
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // If it's a protected route, require a token
        if (pathname.startsWith("/profile") || pathname.startsWith("/admin")) {
          return !!token; 
        }
        
        // Allow access to other matched routes (like /login) to handle logic in the function
        return true;
      },
    },
  }
);

export const config = {
  // Add /admin and any sub-routes (admin/:path*) to the matcher
  matcher: ["/login", "/profile/:path*", "/admin/:path*"],
};