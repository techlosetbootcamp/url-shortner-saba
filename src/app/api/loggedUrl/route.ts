import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user || !session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session?.user?.email;
    const userUrls = await prisma.url.findMany({
      where: {
        userEmail: userEmail,
      },
    });

    if (userUrls.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(userUrls, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
