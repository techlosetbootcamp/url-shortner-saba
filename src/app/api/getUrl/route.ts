import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const urlsWithNullEmail = await prismadb.url.findMany({
      where: { userEmail: null },
    });

    return NextResponse.json(urlsWithNullEmail, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
