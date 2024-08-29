import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (!token) {
      return NextResponse.redirect("https://urlshortner-saba.netlify.app/");
    }
    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  }
);
export const config = { matcher: ["/profile", "/main", "/customSlug"] };
