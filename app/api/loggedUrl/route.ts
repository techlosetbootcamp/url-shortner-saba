// // pages/api/user-urls.js
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/libs/prismadb'; // Adjust the path to your Prisma setup
// import { getServerSession } from 'next-auth'; // Import the session function from NextAuth
// import  {authOptions}  from "@/libs/AuthOptions" // Adjust the path to your auth configuration

// export async function GET() {
//   try {
//     const session = await getServerSession( authOptions);

//     if (!session || !session.user || !session.user.email) {
//       // If not logged in or email not available, return unauthorized
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const userEmail = session.user.email;
//     const userUrls = await prisma.url.findMany({
//       where: {
//         userEmail: userEmail,
//       },
//     });

//     // Handle case where no URLs are found for the user
//     if (userUrls.length === 0) {
//       return NextResponse.json({ message: 'No URLs found for the user' }, { status: 400 });
//     }

//     return NextResponse.json(userUrls, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching user URLs:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }

// pages/api/user-urls.js
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'; // Adjust the path to your Prisma setup
import { getServerSession } from 'next-auth'; // Import the session function from NextAuth
import { authOptions } from "@/libs/AuthOptions"; // Adjust the path to your auth configuration

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      // If not logged in or email not available, return unauthorized
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const userUrls = await prisma.url.findMany({
      where: {
        userEmail: userEmail,
      },
    });

    // Return an empty array if no URLs are found for the user
    if (userUrls.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(userUrls, { status: 200 });
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}








