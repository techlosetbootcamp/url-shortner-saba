import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      // page bnaye ga automatic
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      // login btn pr click kru gi authorize hoga
      // database sai baat  credentials parameter have our email and password
      async authorize(credentials) {
        console.log("Authorize function called");

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          throw new Error("Missing credentials");
        }
// ORM PRISMA
        const user = await prismadb.user.findFirst({
          where: {  
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPassword) {
          console.error("User not registered");
          throw new Error("User not registered");
        }

        console.log("User found:", user);

        const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isPasswordValid) {
          console.error("Invalid credentials");
          throw new Error("Invalid credentials");
        }

        console.log("Password is valid");
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};