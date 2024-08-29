import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { sendResetPasswordEmail } from "@/src/utils/emailer";
import { generateResetToken } from "@/src/utils/crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const resetToken = generateResetToken();
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken },
    });

    await sendResetPasswordEmail(email, resetToken);

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



