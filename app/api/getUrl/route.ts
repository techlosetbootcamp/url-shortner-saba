// app/api/get-urls/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/libs/prismadb'; // Adjust the path to your prisma setup

// export async function GET() {
//   try {
//     const urls = await prisma.url.findMany();
//     return NextResponse.json(urls, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching URLs:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'; // Adjust the path to your prisma setup

export async function GET() {
  try {
   

    // Fetch URLs where userEmail is null
    const urlsWithNullEmail = await prisma.url.findMany({
      where: {
        userEmail: null,
      },
    });
    console.log('URLs with null userEmail:', urlsWithNullEmail);

    return NextResponse.json(urlsWithNullEmail, { status: 200 });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

























