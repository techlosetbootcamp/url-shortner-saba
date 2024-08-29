import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split("/");
    const shortUrl = urlParts[urlParts.length - 1];

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL not provided" },
        { status: 400 }
      );
    }

    const urlRecord = await prisma.url.findUnique({
      where: { shortUrl: shortUrl },
    });

    if (!urlRecord) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    if (urlRecord.status !== "active") {
      return NextResponse.json({ message: "URL is inactive" }, { status: 403 });
    }

    await prisma.url.update({
      where: { shortUrl: shortUrl },
      data: {
        visitCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.redirect(urlRecord.originalUrl);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
