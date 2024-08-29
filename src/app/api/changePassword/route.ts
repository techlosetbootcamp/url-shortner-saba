import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "Token and newPassword are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({ where: { resetToken: token } });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { hashedPassword, resetToken: null },
    });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
