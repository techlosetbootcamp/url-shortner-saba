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
    // Fetch all URLs and log them for debugging
    // const allUrls = await prisma.url.findMany();
    // console.log('All URLs:', allUrls);

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













// import { NextResponse } from 'next/server';
// import prisma from '@/libs/prismadb'; // Adjust the path to your Prisma setup

// export async function GET() {
//   console.log('API route for public URLs hit'); // Verify route is hit

//   try {
//     console.log('Fetching public URLs...');
    
//     // Fetch URLs where `userEmail` is null
//     const urls = await prisma.url.findMany({
//       where: {
//         userEmail: null, // Filters URLs where `userEmail` is not set
//       },
//     });

//     console.log('Retrieved URLs:', urls);

//     if (urls.length === 0) {
//       console.log('No public URLs found.');
//     }

//     return NextResponse.json(urls, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching public URLs:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }











