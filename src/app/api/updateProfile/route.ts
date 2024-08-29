import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const { email, newName, newEmail } = await request.json();

    if (!email || !newName || !newEmail) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.url.updateMany({
        where: { userEmail: email },
        data: { userEmail: newEmail },
      });
    });
      
       await prisma.user.update({
        where: { id: user.id },
        data: {
          name: newName,
          email: newEmail,
        },
      });
  

    return NextResponse.json({
      message: "Profile and associated URLs updated successfully",
      user: {
        ...user,
        name: newName,
        email: newEmail,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
