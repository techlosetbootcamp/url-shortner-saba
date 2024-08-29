import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const { shortUrl, status } = await req.json();

    if (!shortUrl || !status) {
      return NextResponse.json(
        { message: "Missing shortUrl or status" },
        { status: 400 }
      );
    }

    const updatedUrl = await prisma.url.update({
      where: { shortUrl },
      data: { status },
    });

    return NextResponse.json(updatedUrl, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: "Method PATCH is allowed" },
    { status: 200 }
  );
}
