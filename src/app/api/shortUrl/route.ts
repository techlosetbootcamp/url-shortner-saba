import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { nanoid } from "nanoid";
import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, customSlug } = body;

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    let userEmail = null;
    if (session && session?.user && session?.user?.email) {
      userEmail = session?.user?.email;
    }

    if (customSlug) {
      const existingUrl = await prisma.url.findUnique({
        where: { shortUrl: customSlug },
      });

      if (existingUrl) {
        return NextResponse.json(
          { message: "This slug already exists" },
          { status: 400 }
        );
      }
    }

    if (!userEmail) {
      const trialUrlsCount = await prisma.url.count({
        where: { userEmail: null },
      });

      if (trialUrlsCount >= 5) {
        return NextResponse.json(
          { message: "Trial limit reached" },
          { status: 400 }
        );
      }
    }

    const shortUrl = customSlug || nanoid(6);

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl: shortUrl,
        userEmail: userEmail,
      },
    });

    return NextResponse.json(
      {
        message: "URL shortened successfully",
        shortUrl: `${process.env.NEXTAUTH_URL}/api/redirect/${newUrl?.shortUrl}`,
        originalUrl: newUrl.originalUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
