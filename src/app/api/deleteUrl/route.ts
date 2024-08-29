import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(req: NextRequest) {
  try {
    const { shortUrl } = await req.json();

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL not provided" },
        { status: 400 }
      );
    }

    const urlRecord = await prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!urlRecord) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    await prisma.url.delete({
      where: { shortUrl },
    });

    return NextResponse.json({ message: "URL deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
