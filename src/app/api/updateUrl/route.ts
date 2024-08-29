import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const { oldShortUrl, newShortUrl } = await req.json();

    if (!oldShortUrl || !newShortUrl) {
      return NextResponse.json(
        { message: "Old and new short URLs must be provided" },
        { status: 400 }
      );
    }

    const existingUrlRecord = await prisma.url.findUnique({
      where: { shortUrl: newShortUrl },
    });

    if (existingUrlRecord) {
      return NextResponse.json(
        { message: "New short URL already exists" },
        { status: 400 }
      );
    }

    const updatedUrlRecord = await prisma.url.update({
      where: { shortUrl: oldShortUrl },
      data: { shortUrl: newShortUrl },
    });

    return NextResponse.json({
      message: "Short URL updated successfully",
      updatedUrlRecord,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
