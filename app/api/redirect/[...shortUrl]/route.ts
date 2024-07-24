import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split('/');
    const shortUrl = urlParts[urlParts.length - 1];

    if (!shortUrl) {
      return NextResponse.json({ message: 'Short URL not provided' }, { status: 400 });
    }

    // Find the URL record in the database
    const urlRecord = await prisma.url.findUnique({
      where: { shortUrl: shortUrl },
    });



    


    if (!urlRecord) {
      return NextResponse.json({ message: 'URL not found' }, { status: 404 });
    }

    // Check the status of the URL
    if (urlRecord.status !== 'active') {
      return NextResponse.json({ message: 'URL is inactive' }, { status: 403 });
    }

    // Increment visit count
    await prisma.url.update({
      where: { shortUrl: shortUrl },
      data: {
        visitCount: {
          increment: 1,
        },
      },
    });


  



    // Redirect to the original URL
    return NextResponse.redirect(urlRecord.originalUrl);

   
  } catch (error) {
    console.error('Error redirecting URL:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}