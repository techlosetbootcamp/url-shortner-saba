// import { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import prismadb from "./prismadb";
// import bcrypt from "bcrypt";

// export const authOptions: AuthOptions = {
//   providers: [
//     Credentials({
//       name: "credentials",
//       // page bnaye ga automatic
//       credentials: {
//         email: { type: "email" },
//         password: { type: "password" },
//       },
//       // login btn pr click kru gi authorize hoga
//       // database sai baat  credentials parameter have our email and password
//       async authorize(credentials) {
//         console.log("Authorize function called");

//         if (!credentials?.email || !credentials?.password) {
//           console.error("Missing credentials");
//           throw new Error("Missing credentials");
//         }
// // ORM PRISMA
//         const user = await prismadb.user.findFirst({
//           where: {  
//             email: credentials.email,
//           },
//         });

//         if (!user || !user.id || !user.hashedPassword) {
//           console.error("User not registered");
//           throw new Error("User not registered");
//         }

//         console.log("User found:", user);

//         const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
//         if (!isPasswordValid) {
//           console.error("Invalid credentials");
//           throw new Error("Invalid credentials");
//         }

//         console.log("Password is valid");
//         return user;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   debug: process.env.NODE_ENV !== "production",
// };






import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPassword) {
          throw new Error("User not registered");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      } else {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
};



