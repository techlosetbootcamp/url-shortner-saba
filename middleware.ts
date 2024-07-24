import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("Token:", token);

    // If the token is not present, redirect to the login page
    if (!token) {
      return NextResponse.redirect("http://localhost:3000/");
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/login', // Customize the sign-in page URL if needed
    },
  }
);

export const config = { matcher: ["/main" , "/profile" , "/customSlug"] };
